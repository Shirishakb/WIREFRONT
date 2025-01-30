import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd'; // Using react-rnd for resizing and dragging
import { useParams ,useLocation, useNavigate} from 'react-router-dom';
import { getPageById, updatePage } from '../api/pages';
import { getComponents, createComponent, deleteComponent, updateComponent } from '../api/components';
import { COMPONENT_TYPES } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';


interface Component {
  _id?: string;
  id?: string,
  type: string;
  properties: { [key: string]: any };
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const DEFAULT_POSITION_OFFSET = 50; // Offset for new components to avoid overlap

const PageEditor = () => {
  const { pageId } = useParams();
  const location = useLocation();
  const [page, setPage] = useState<{ pageName: string; _id: string; width: number; height: number,projectId:string } | null>(null);
  const [newPageName, setNewPageName] = useState<string>('');
  const [isEditingPageName, setIsEditingPageName] = useState<boolean>(false);
  const navigate = useNavigate();
  const [components, setComponents] = useState<Component[]>([]); // Components in the workspace
  const [removedComponents, setRemovedComponents] = useState<Component[]>([]); // Removed components
  const [newComponentType, setNewComponentType] = useState(COMPONENT_TYPES.BUTTON); // Default type
  const [chosenComponents, setChosenComponents] = useState<Component[]>([]); // Chosen components
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track the component being edited
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [optionValue, setOptionValue] = useState<string>(''); // The new value for the option



  useEffect(() => {
    if (pageId) {
      fetchPage(pageId);
      fetchComponents();




    }
  }, [pageId]);
  
 

  // Use page name from location state if available
  useEffect(() => {
    if (pageId) {
      fetchPage(pageId);
    }
  }, [location.state, pageId]);


// Fetch details from API"
  const fetchPage = async (pageId: string) => {
    const data = await getPageById(pageId);
    if (data) {
      setPage(data);
    }
  };

  const handleSavePageName = async () => {
  
      if (page && pageId && newPageName)
      {
        await updatePage(pageId, { pageName: newPageName });

        setPage({ ...page, pageName: newPageName });

        setIsEditingPageName(false);
      }


  };

  const handleCancelEdit = () => {
    setNewPageName('');
    setIsEditingPageName(false);
  };
  const fetchComponents = async () => {
    try {
      const data = await getComponents(pageId || '');
      const comps = [];

      if (data) for (let comp of data) {
        comps.push({
          id: comp.componentId,
          _id: comp.componentId,
          type: comp.componentType,
          //properties: { content: comp.content },
          properties: comp.properties || {},
          position: { x: comp.componentXPosition, y: comp.componentYPosition },
          size: { width: comp.componentWidth, height: comp.componentHeight },
        });
      }

      setComponents(comps);

    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  const addComponent = () => {
    const newComponent: Component = {
      type: newComponentType,
      properties: {},
      position: { x: DEFAULT_POSITION_OFFSET, y: DEFAULT_POSITION_OFFSET },
      size: { width: 150, height: 50 },
    };

    addComponentToWorkspace(newComponent);
  };

  const addComponentToWorkspace = async (component: Component) => {
    const offset = components.length * DEFAULT_POSITION_OFFSET;
    const newComponent = {
      ...component,
      position: { x: component.position.x + offset, y: component.position.y + offset },
      id: `${component.type}-${Date.now()}`,
    };
    //setComponents((prev) => [...prev, newComponent]);
    //setChosenComponents((prev) => prev.filter((comp) => comp !== component));

    // Save the new component to database
    await createComponent(pageId || '', {
      componentType: component.type,
      componentWidth: component.size.width,
      componentHeight: component.size.height,
      componentXPosition: newComponent.position.x,
      componentYPosition: newComponent.position.y,
    });

    fetchComponents();
  };

  const removeComponentFromWorkspace = (id: string) => {

    const componentToRemove:any = components.find((comp) => comp._id === id);

    if (componentToRemove) {
      setComponents((prev) => prev.filter((comp) => comp._id !== id));
      setRemovedComponents((prev) => [...prev, componentToRemove]);
      
      deleteComponent(componentToRemove._id);
    }
  };


  const restoreComponent = (id: string) => {
    const componentToRestore = removedComponents.find((comp) => comp._id === id);
    if (componentToRestore) {
      setRemovedComponents((prev) => prev.filter((comp) => comp._id !== id));
     /// setComponents((prev) => [...prev, componentToRestore]);

      addComponentToWorkspace(componentToRestore);
    }
  };

  // Back button click handler
  const handleBackButtonClick = () => {
 
      //console.log('Navigating back to project:', projectIdFromStorage); // Log the projectId for debugging
      navigate(`/project/${page.projectId}`);  // Navigate back to the project page

  };
  // Edit component properties

  const editComponentProperties = (component: Component) => {
    setChosenComponents([component]);
    setIsEditing(component._id || null); // Set the component as being edited
    if (component.type === COMPONENT_TYPES.RADIO || component.type === COMPONENT_TYPES.CHECKBOX ) {
      setOptionValue(component.properties.content || '');
      setShowModal(true);
    }
  };

  // Update the saveComponentProperties function
  const saveComponentProperties = async (component: Component, content: string) => {
    
    let updatedProperties = { ...component.properties };

      // Handle Checkbox component: Update checked state
      if (component.type === COMPONENT_TYPES.CHECKBOX) {
        const currentCheckedState = updatedProperties.checked || [];
        const isChecked = currentCheckedState.includes(content);

        // Toggle the checked state for the specific checkbox (add/remove from array)
        updatedProperties.checked = isChecked
          ? currentCheckedState.filter((value: string) => value !== content)
          : [...currentCheckedState, content];
      }


      // Handle Radio component: Update selected radio
      else if (component.type === COMPONENT_TYPES.RADIO) {
        updatedProperties = {
          ...updatedProperties,
          selected: content, // Update the selected option for radio
          content: optionValue,
        };
      } else {
        // For other components like Button, Header, etc.
        updatedProperties = {
          ...updatedProperties,
          content: content, // Update text content
        };
      }

      component.properties = updatedProperties;

      await updateComponent(component._id || '', {
        //properties: updatedProperties,
        properties: updatedProperties,
      });

      fetchComponents();

     // After saving, remove the component from the list of components being edited
     setChosenComponents((prev) => prev.filter((comp) => comp._id !== component._id)); // Remove from chosen list
     //setChosenComponents([]); // Clear the chosen components
     setIsEditing(null); // Hide the form after saving
     setShowModal(false); // Hide the modal after saving
  };

  const renderComponent = (component: Component) => {
    switch (component.type) {
      case COMPONENT_TYPES.BUTTON:
        return <button style={{ width: '100%', height: '100%' }}>{component.properties.content || 'Button'}</button>;
      case COMPONENT_TYPES.RADIO:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                <input
                  type="radio"
                  name={component._id} // Make sure name is unique for each component
                  checked={component.properties.selected === component.properties.content}
                  onChange={() => saveComponentProperties(component, component.properties.content)}
                />
                {component.properties.content}
              </label>
            
          </div>
        );
      case COMPONENT_TYPES.CHECKBOX:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Iterate over each checkbox option and allow the user to edit the name */}
            {component.properties.checked?.map((label: string) => (
              <label key={label}>
                <input
                  type="checkbox"
                  checked={component.properties.checked?.includes(label)} // Ensure correct checked state is passed
                  onChange={() => saveComponentProperties(component, label)} // Toggle checkbox state
                />
                {isEditing === component._id ? (
                  <input
                    type="text"
                    value={optionValue} // Use the optionValue state to handle input value
                    onChange={(e) => setOptionValue(e.target.value)} // Allow editing the name
                    onBlur={() => {
                      saveComponentProperties(component, optionValue); // Save the new label
                      setIsEditing(null); // Close editing mode after save
                    }}
                  />
                ) : (
                  label // Display the option name
                )}
              </label>
            ))}
          </div>
        );
      case COMPONENT_TYPES.HEADER:
        return <h1>{component.properties.content || 'Header'}</h1>;
      case COMPONENT_TYPES.LINK:
        return <a href={component.properties.href || '#'}>{component.properties.content || 'Link'}</a>;
      case COMPONENT_TYPES.CONTAINER:
        return <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{component.properties.content || 'Container'}</div>;
      case COMPONENT_TYPES.PARAGRAPH:
        return <p>{component.properties.content || 'Paragraph'}</p>;
      case COMPONENT_TYPES.TEXTBOX:
        return <input type="text" value={component.properties.content || ''} style={{ width: '100%', height: '100%' }} onChange={(e:any) => console.log(e)} />;
      default:
        return <div style={{ color: 'red' }}>Component type not recognized</div>;
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={handleBackButtonClick}  // Use the handleBackButtonClick function
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'black',
          cursor: 'pointer',
          padding: '0',
          marginBottom: '10px',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          width: 'auto',
        }}
        title="Back to Project Page"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2 style={{ color: '#4CAF50' }}>Interactive Page Editor</h2>
      {/* Page Name Editing Section */}
      {isEditingPageName ? (
        <div>
          <input
            type="text"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            placeholder="Edit page name"
          />
          <button onClick={handleSavePageName}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{page ? page.pageName :  "Page"}</h3>
          <button onClick={() => setIsEditingPageName(true)}>Edit page</button>

        </div>
      )}
      {/* Modal for editing radio/checkbox options */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editOption">
              <Form.Label>Edit Option</Form.Label>
              <Form.Control
                type="text"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (chosenComponents.length > 0) {
                saveComponentProperties(chosenComponents[0], optionValue);
              }
              setShowModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <label htmlFor="componentType">Choose Component: </label>
        <select
          id="componentType"
          value={newComponentType}
          onChange={(e) => setNewComponentType(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          {Object.values(COMPONENT_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={addComponent}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>

      <div style={{ border: '1px solid #ddd', padding: '10px', background: '#f9f9f9' }}>
        <h3>Chosen Components</h3>
        {chosenComponents.length > 0 ? (
          <ul>
            {chosenComponents.map((component, index) => (
              <li key={`${component.type}-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                {isEditing === component._id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const content = formData.get('content') as string;
                      saveComponentProperties(component, content);
                    }}
                  >
                    <textarea placeholder="Text for component..." name="content" />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <span>{component.type}</span>
                    <button
                      onClick={() => editComponentProperties(component)}
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        padding: '3px 8px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No components chosen yet.</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Removed Components</h3>
        {removedComponents.length > 0 ? (
          <ul>
            {removedComponents.map((component) => (
              <li key={component._id}>
                <span>{component.type}</span>
                <button
                  onClick={() => restoreComponent(component._id || '')}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '3px 8px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Restore
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No removed components yet.</p>
        )}
      </div>

      <div style={{ position: 'relative', width: '100%', height: '500px', border: '1px solid #ddd', background: '#fff', overflow: 'hidden', marginTop: '20px' }}>
        <h3>Workspace</h3>
        {components.map((component) => (
          <Rnd
            key={component.id || component._id}
            size={component.size}
            position={component.position}
            onDragStop={(_, data) => {
              setComponents((prev) =>
                prev.map((comp) =>
                  comp._id === component._id ? { ...comp, position: { x: data.x, y: data.y } } : comp
                )
              );
            }}
            onResizeStop={(_, __, ref, ___, position) => {
              setComponents((prev) =>
                prev.map((comp) =>
                  comp._id === component._id
                    ? { ...comp, size: { width: ref.offsetWidth, height: ref.offsetHeight }, position }
                    : comp
                )
              );
            }}
            bounds="parent"
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topLeft: true,
              topRight: true,
              bottomLeft: true,
              bottomRight: true,
            }}
            style={{
              margin: '0',
              padding: '0',
              border: 'none',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ background: '#f0f0f0', width: '100%', height: '100%' }}>
              {renderComponent(component)}
              <button
                onClick={() => editComponentProperties(component)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 5px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => removeComponentFromWorkspace(component._id || '')}
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '5px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '2px 5px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default PageEditor;

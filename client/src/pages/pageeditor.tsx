import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd'; // Using react-rnd for resizing and dragging
import { useParams } from 'react-router-dom';
import { getComponents } from '../api/components';
import { COMPONENT_TYPES } from '../constants';


interface Component {
  id?: string;
  type: string;
  properties: { [key: string]: any };
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const DEFAULT_POSITION_OFFSET = 50; // Offset for new components to avoid overlap

const PageEditor = () => {
  const { pageId } = useParams();
  const [components, setComponents] = useState<Component[]>([]); // Components in the workspace
  const [removedComponents, setRemovedComponents] = useState<Component[]>([]); // Removed components
  const [newComponentType, setNewComponentType] = useState(COMPONENT_TYPES.BUTTON); // Default type
  const [chosenComponents, setChosenComponents] = useState<Component[]>([]); // Chosen components
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track the component being edited

  useEffect(() => {
    fetchComponents();
  }, [pageId]);

  const fetchComponents = async () => {
    try {
      const data = await getComponents(pageId || '');
      if (data) {
        setComponents(data);
      }
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
// add components to workspace
  const addComponentToWorkspace = (component: Component) => {
    const offset = components.length * DEFAULT_POSITION_OFFSET;
    const newComponent = {
      ...component,
      position: { x: component.position.x + offset, y: component.position.y + offset },
      id: `${component.type}-${Date.now()}`,
    };
    setComponents((prev) => [...prev, newComponent]);
    setChosenComponents((prev) => prev.filter((comp) => comp !== component));
  };
//remove components from workspace
  const removeComponentFromWorkspace = (id: string) => {
    const componentToRemove = components.find((comp) => comp.id === id);
    if (componentToRemove) {
      setComponents((prev) => prev.filter((comp) => comp.id !== id));
      setRemovedComponents((prev) => [...prev, componentToRemove]);
    }
  };

  /*const removeComponentFromChosenList = (component: Component) => {
    setChosenComponents((prev) => prev.filter((comp) => comp !== component));
    setRemovedComponents((prev) => [...prev, component]);
  };*/

  const restoreComponent = (id: string) => {
    const componentToRestore = removedComponents.find((comp) => comp.id === id);
    if (componentToRestore) {
      setRemovedComponents((prev) => prev.filter((comp) => comp.id !== id));
      setComponents((prev) => [...prev, componentToRestore]);
    }
  };

  const editComponentProperties = (component: Component) => {
    setChosenComponents([component]);
    setIsEditing(component.id || null); // Set the component as being edited
  };

  const saveComponentProperties = (component: Component, content: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === component.id ? { ...comp, properties: { ...comp.properties, content } } : comp
      )
    );
    setChosenComponents((prev) => prev.filter((comp) => comp.id !== component.id)); // Remove from chosen list

    setIsEditing(null); // Hide the form after saving
  };

  const renderComponent = (component: Component) => {
    switch (component.type) {
      case COMPONENT_TYPES.BUTTON:
        return <button style={{ width: '100%', height: '100%' }}>{component.properties.content || 'Button'}</button>;
      case COMPONENT_TYPES.RADIO:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              <input type="radio" name="radio" /> Option 1
            </label>
            <label>
              <input type="radio" name="radio" /> Option 2
            </label>
          </div>
        );
      case COMPONENT_TYPES.CHECKBOX:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              <input type="checkbox" /> Check 1
            </label>
            <label>
              <input type="checkbox" /> Check 2
            </label>
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
      case COMPONENT_TYPES.SELECT:
        return (
          <select style={{ width: '100%', height: '100%' }}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        );
      case COMPONENT_TYPES.TEXTBOX:
        return <input type="text" value={component.properties.content || ''} style={{ width: '100%', height: '100%' }} />;
      default:
        return <div style={{ color: 'red' }}>Component type not recognized</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#4CAF50' }}>Interactive Page Editor</h2>

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
                {isEditing === component.id ? (
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
              <li key={component.id}>
                <span>{component.type}</span>
                <button
                  onClick={() => restoreComponent(component.id || '')}
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
            key={component.id}
            size={component.size}
            position={component.position}
            onDragStop={(_, data) => {
              setComponents((prev) =>
                prev.map((comp) =>
                  comp.id === component.id ? { ...comp, position: { x: data.x, y: data.y } } : comp
                )
              );
            }}
            onResizeStop={(_, __, ref, ___, position) => {
              setComponents((prev) =>
                prev.map((comp) =>
                  comp.id === component.id
                    ? { ...comp, size: { width: ref.offsetWidth, height: ref.offsetHeight }, position }
                    : comp
                )
              );
            }}
            bounds="parent" // Ensures dragging is within the workspace
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
              margin: '0', // Ensure no margins are applied
              padding: '0', // Remove any padding around the component
              border: 'none', // Optional: Remove any borders around the component
              boxSizing: 'border-box', // Make sure the padding and borders do not affect sizing
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
                onClick={() => removeComponentFromWorkspace(component.id || '')}
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

import { useState, useEffect } from 'react';
import Rnd, { RndResizeCallback, RndDragCallback } from 'react-rnd';

interface Component {
  id?: string;
  type: string;
  properties: object;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface PageEditorProps {
  pageId: string;
}

const PageEditor = ({ pageId }: PageEditorProps) => {
  const [components, setComponents] = useState<Component[]>([]);

  // Fetch components from the backend
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/comp/${pageId}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer YOUR_TOKEN_HERE',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch components');
        }

        const data = await response.json();
        setComponents(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching components:', error.message);
        } else {
          console.error('Error fetching components:', error);
        }
      }
    };

    fetchComponents();
  }, [pageId]);

  // Add a new component
  const addComponent = async (newComponent: Component) => {
    try {
      setComponents((prev) => [...prev, newComponent]); // Optimistic update
      const response = await fetch('http://127.0.0.1:5000/api/comp', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComponent),
      });

      if (!response.ok) {
        throw new Error('Failed to add component');
      }

      const savedComponent = await response.json();
      setComponents((prev) =>
        prev.map((comp) =>
          comp === newComponent ? { ...newComponent, id: savedComponent.id } : comp
        )
      );
    } catch (error) {
      console.error('Error adding component:', (error as Error).message);
    }
  };

  // Update a component
  const updateComponent = async (
    id: string,
    updates: Partial<Component>
  ) => {
    if (!id) return;

    try {
      setComponents((prev) =>
        prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
      );

      const response = await fetch(`http://127.0.0.1:5000/api/comp/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update component');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating component:', error.message);
      } else {
        console.error('Error updating component:', error);
      }
    }
  };

  // Delete a component
  const deleteComponent = async (id: string) => {
    if (!id) return;

    try {
      setComponents((prev) => prev.filter((comp) => comp.id !== id));

      const response = await fetch(`http://127.0.0.1:5000/api/comp/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete component');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting component:', error.message);
      } else {
        console.error('Error deleting component:', error);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button
        onClick={() => {
          const newComponent: Component = {
            type: '', // Ensure the caller provides the type
            properties: {},
            position: { x: 0, y: 0 },
            size: { width: 100, height: 50 },
          };
          addComponent(newComponent);
        }}
      >
        Add Component
      </button>
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
        {components.map((component) => (
          <Rnd
            key={component.id}
            size={component.size}
            position={component.position}
            onDragStop={((_, data) => {
              if (component.id) {
                updateComponent(component.id, { position: { x: data.x, y: data.y } });
              }
            }) as RndDragCallback}
            onResizeStop={((_, __, ref, ___, position) => {
              if (component.id) {
                updateComponent(component.id, {
                  size: {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                  },
                  position,
                });
              }
            }) as RndResizeCallback}
          >
            <div style={{ border: '1px solid #000', padding: '5px' }}>
              <span>Type: {component.type || 'N/A'}</span>
              <button onClick={() => component.id && deleteComponent(component.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default PageEditor;

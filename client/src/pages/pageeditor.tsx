import { useState, useEffect } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';

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

  // Fetch components (only if backend is implemented)
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/comp/${pageId}`, {
          method: 'GET',
          headers: { Authorization: 'Bearer YOUR_TOKEN_HERE', 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch components');
        const data = await response.json();
        setComponents(data);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };
    fetchComponents();
  }, [pageId]);

  // Add new component
  const addComponent = (newComponent: Component) => {
    setComponents((prev) => [...prev, newComponent]);
  };

  // Update existing component
  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents((prev) => prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)));
  };

  // Delete a component
  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button
        onClick={() =>
          addComponent({
            type: '',
            properties: {},
            position: { x: 0, y: 0 },
            size: { width: 100, height: 50 },
          })
        }
      >
        Add Component
      </button>
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
        {components.map((component) => (
          <Rnd
            key={component.id || Math.random()}
            size={component.size}
            position={component.position}
            onDragStop={(e: any, data: { x: number; y: number }) => updateComponent(component.id!, { position: { x: data.x, y: data.y } })}
            onResizeStop={(e: any, dir: any, ref: HTMLElement, delta: any, position: { x: number; y: number }) =>
              updateComponent(component.id!, {
                size: { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) },
                position,
              })
            }
          >
            <div style={{ border: '1px solid #000', padding: '5px' }}>
              <span>Type: {component.type || 'N/A'}</span>
              <button onClick={() => deleteComponent(component.id!)} style={{ marginLeft: '10px' }}>
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

import React, { useState, useEffect } from 'react';
import Rnd from 'react-rnd'; // For drag-and-resize functionality
import { COMPONENT_TYPES } from '../constants';
import ComponentProps from '../interfaces/componentProps';
import styles from '../styles/PageEditor.module.css';

const PageEditor: React.FC<{ pageId: string }> = ({ pageId }) => {
  const [components, setComponents] = useState<ComponentProps[]>([]);

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
        console.error('Error fetching components:', error);
      }
    };

    fetchComponents();
  }, [pageId]);

  // Add a new component
  const addComponent = async () => {
    const newComponent: ComponentProps = {
      id: Math.random(), // Temporary ID for unsaved components
      type: COMPONENT_TYPES.BUTTON, // Example type
      properties: { text: 'Button' },
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
    };

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
      console.error('Error adding component:', error);
    }
  };

  // Update a component
  const updateComponent = async (
    id: number | undefined,
    updates: Partial<ComponentProps['properties'] | ComponentProps['position'] | ComponentProps['size']>
  ) => {
    if (id === undefined) return;

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
      console.error('Error updating component:', error);
    }
  };

  // Delete a component
  const deleteComponent = async (id: number | undefined) => {
    if (id === undefined) return;

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
      console.error('Error deleting component:', error);
    }
  };

  // Render components
  return (
    <div className={styles.pageEditor}>
      <button onClick={addComponent}>Add Component</button>
      <div className={styles.canvas}>
        {components.map((component) => (
          <Rnd
            key={component.id || Math.random()} // Temporary key for unsaved components
            size={component.size}
            position={component.position}
            onDragStop={(_: any, data: any) => {
              updateComponent(component.id, {
                position: { x: data.x, y: data.y } as ComponentProps['position'],
              });
            }}
            onResizeStop={(_: any, __: any, ref: any, ___: any, position: any) => {
              updateComponent(component.id, {
                size: { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) } as ComponentProps['size'],
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                },
                position,
              });
            }}
          >
            <componentRenderer
              component={component}
              onDelete={() => deleteComponent(component.id)}
            />
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default PageEditor;

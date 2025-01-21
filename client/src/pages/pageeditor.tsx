import React, { useState } from 'react';
import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import ComponentRenderer from '../components/componentRenderer.tsx';
import { COMPONENT_TYPES } from '../constants';
import ComponentProps from '../interfaces/componentProps.tsx';
import componentApi from '../../../server/src/routes/api/componentApi.ts';
import styles from '../styles/pageEditor.module.css';

const PageEditor: React.FC = () => {
    const [components, setComponents] = useState<ComponentProps[]>([]);

    const addComponent = (type: string) => {
        setComponents((prev) => [
            ...prev,
            {
                id: Date.now(),
                type,
                properties: { text: '', placeholder: '', options: [], href: '', label: '' },
                position: { x: 0, y: 0 },
                size: { width: 150, height: 50 },
            },
        ]);
    };

    const updateComponent = (id: number, updates: Partial<ComponentProps['properties']>) => {
        setComponents((prev) =>
            prev.map((comp) => (comp.id === id ? { ...comp, properties: { ...comp.properties, ...updates } } : comp))
        );
    };

    const deleteComponent = async (id: number) => {
        try {
            await componentApi.delete(id);
            setComponents((prev) => prev.filter((comp) => comp.id !== id));
        } catch (error) {
            console.error('Error deleting component:', error);
        }
    };

    const saveAllComponents = async () => {
        try {
            await componentApi.save(components);
            alert('Components saved successfully!');
        } catch (error) {
            console.error('Error saving components:', error);
        }
    };

    return (
        <div>
            <div>
                {Object.values(COMPONENT_TYPES).map((type) => (
                    <button key={type} onClick={() => addComponent(type)}>
                        Add {type}
                    </button>
                ))}
                <button onClick={saveAllComponents}>Save All</button>
            </div>
            <div className={styles.container}>
                {components.map((component) => (
                    <Draggable
                        key={component.id}
                        onStop={(_: DraggableEvent, data: DraggableData) => {
                            setComponents((prev) =>
                                prev.map((comp) =>
                                    comp.id === component.id
                                        ? { ...comp, position: { x: data.x, y: data.y } }
                                        : comp
                                )
                            );
                        }}
                    >
                        <div className={styles.component} style={{ width: component.size.width, height: component.size.height, position: 'absolute', left: component.position.x, top: component.position.y }}>
                            <ComponentRenderer component={component} onUpdate={updateComponent} onDelete={deleteComponent} />
                        </div>
                    </DraggableCore>
                ))}
            </div>
        </div>
    );
};

export default PageEditor;

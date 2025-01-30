import React from 'react';
import { COMPONENT_TYPES } from '../constants/index.ts';
import componentRenderProps from '../interfaces/componentRendererProps.ts';

const componentRenderer: React.FC<componentRenderProps> = ({ component, onUpdate, onDelete }) => {
    const { id, type, properties } = component as { id: number | undefined, type: string, properties: any };

    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (id !== undefined) {
            onUpdate(id, { [e.target.name]: e.target.value });
        }
    };

    const renderComponent = () => {
        switch (type) {
          case COMPONENT_TYPES.BUTTON:
            return <button>{properties?.text || 'Button'}</button>;
          case COMPONENT_TYPES.TEXTBOX:
            return <input type="text" placeholder={properties?.placeholder || ''} />;          
          default:
            return null;
        }
      };

    return (
        <div>
            <div>{renderComponent()}</div>
            <div>
                <input
                    name="text"
                    placeholder="Edit Text"
                    value={properties.text || ''}
                    onChange={handlePropertyChange}
                />
                <button onClick={() => id !== undefined && onDelete(id)}>Delete</button>
            </div>
        </div>
    );
};

export default componentRenderer;

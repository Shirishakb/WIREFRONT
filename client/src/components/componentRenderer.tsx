import React from 'react';
import { COMPONENT_TYPES } from '../constants/index.ts';
import componentRenderProps from '../interfaces/componentRenderProps.tsx';

const componentRenderer: React.FC<componentRenderProps> = ({ component, onUpdate, onDelete }) => {
    const { id, type, properties } = component;

    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(id, { [e.target.name]: e.target.value });
    };

    const renderComponent = () => {
        switch (type) {
            case COMPONENT_TYPES.BUTTON:
                return <button>{properties.text || 'Button'}</button>;
            case COMPONENT_TYPES.CHECKBOX:
                return <label><input type="checkbox" /> {properties.label || 'Checkbox'}</label>;
            case COMPONENT_TYPES.CONTAINER:
                return <div>{properties.text || 'Container'}</div>;
            case COMPONENT_TYPES.HEADER:
                return <h1>{properties.text || 'Header'}</h1>;
            case COMPONENT_TYPES.LINK:
                return <a href={properties.href || '#'}>{properties.text || 'Link'}</a>;
            case COMPONENT_TYPES.PARAGRAPH:
                return <p>{properties.text || 'Paragraph'}</p>;
            case COMPONENT_TYPES.RADIO:
                return <label><input type="radio" /> {properties.label || 'Radio Button'}</label>;
            case COMPONENT_TYPES.SELECT:
                return (
                    <select>
                        {(properties.options || []).map((opt, index) => (
                            <option key={index}>{opt}</option>
                        ))}
                    </select>
                );
            case COMPONENT_TYPES.TEXTBOX:
                return <input type="text" placeholder={properties.placeholder || ''} />;
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
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
};

export default componentRenderer;

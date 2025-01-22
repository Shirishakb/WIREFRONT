import componentProps from '../interfaces/componentProps.tsx';

export interface componentRenderProps {
    component: componentProps;
    onUpdate: (id: number, updates: Partial<componentProps['properties']>) => void;
    onDelete: (id: number) => void;
}

export default componentRenderProps;

import ComponentProps from '../interfaces/componentProps.tsx';

export interface componentRenderProps {
    component: ComponentProps;
    onUpdate: (id: string, updates: Partial<ComponentProps['properties']>) => void;
    onDelete: (id: string) => void;
}

export default componentRenderProps;

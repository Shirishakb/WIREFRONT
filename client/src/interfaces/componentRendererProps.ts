import ComponentProps from '../interfaces/componentProps';

export interface componentRenderProps {
    component: ComponentProps;
    onUpdate: (id: number, updates: Partial<ComponentProps['properties']>) => void;
    onDelete: (id: number) => void;
}

export default componentRenderProps;
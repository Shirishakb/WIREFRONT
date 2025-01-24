export interface componentProps {
    id: string;
    type: string;
    properties: {
        text?: string;
        placeholder?: string;
        options?: string[];
        href?: string;
        label?: string;
    };
    position: { x: number; y: number };
    size: { width: number; height: number };
}

export default componentProps;

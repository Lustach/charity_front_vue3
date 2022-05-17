export interface Props {
    type?: string;
    label: string;
    placeholder: string;
    id: string;
    modelValue?: string;
    error: string;
    tooltip?: string,
    maxWidth?: string;
    maxLength?: number;
    disabled?: boolean;
    eye?: boolean;
    modelOriginal?: string;
    modelHidden?: string;
}

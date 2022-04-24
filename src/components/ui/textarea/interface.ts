export interface Props {
    type?: string;
    label: string;
    placeholder: string;
    id: string;
    modelValue?: string;
    error: any;
    maxLength: number | string | null | undefined;
    fullSize: Boolean,
}

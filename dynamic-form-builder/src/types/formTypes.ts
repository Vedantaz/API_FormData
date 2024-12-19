export type FormField = {
    id: string,
    label: string,
    type: 'text' | 'email' | 'number' | 'select';
    options?: string[];
    required: boolean;
}

export type FormConfig = FormField[];

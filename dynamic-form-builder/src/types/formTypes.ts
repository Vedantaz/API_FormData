export type FormField = {
    id: string,
    label: string,
    type: 'text' | 'email' | 'number' | 'select'| 'password' | "textarea" | "checkbox" | "radio";
    options?: string[];
    required: boolean;
}

export type FormConfig = FormField[];


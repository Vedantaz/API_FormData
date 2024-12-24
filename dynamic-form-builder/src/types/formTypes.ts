export type FormField = {
    id: string,
    label: string,
    type: 'text' | 'email' | 'number' | 'select'| 'password' | "textarea" | "checkbox" | "radio" | 'confirmPassword';
    // options?: string[];     // used for useForm Logic
    options?:  { value: string; label: string }[];     // using for formik logic
    required: boolean;
}

export type FormConfig = FormField[];


export type FormField = {
    id: string,
    label: string,
    type: 'text' | 'email' | 'number' | 'select'| 'password' | "textarea" | "checkbox" | "radio" | 'confirmPassword' | 'date' |  'tel';
    // options?: string[];     // used for useForm Logic
    options?:  { value: string; label: string }[];     // using for formik logic
    required: boolean;
    category:string;
}

export type FormConfig = FormField[];
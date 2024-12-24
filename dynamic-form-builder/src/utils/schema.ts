import * as Yup from 'yup';
import { FormConfig, FormField } from '../types/formTypes';

export const createSchema = (fields: FormConfig) => {
    const schema: Record<string, Yup.AnySchema> = {};

    fields.forEach((field: FormField) => {
        switch (field.type) {
            case 'email':
                schema[field.id] = Yup.string()
                    .email('Invalid email address')
                    .required(`${field.label} is required`);
                break;

            case 'password':
                schema[field.id] = Yup.string()
                    .min(8, 'Password must be at least 8 characters long')
                    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
                    .matches(/\d/, 'Password must contain a number')
                    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
                    .required(`${field.label} is required`);
                break;

            case 'confirmPassword':
                schema[field.id] = Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords do not match')
                    .required('Please confirm your password');
                break;

            case 'number':
                schema[field.id] = Yup.number()
                    .typeError(`${field.label} must be a valid number`)
                    .optional();
                break;

            default:
                schema[field.id] = field.required
                    ? Yup.string().required(`${field.label} is required`)
                    : Yup.string().optional();
        }
    });

    return Yup.object().shape(schema);
};

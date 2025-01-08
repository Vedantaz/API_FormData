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

                    if (field.id === 'age') {
                        
                        schema[field.id] = (schema[field.id] as Yup.NumberSchema)
                            .min(18, `${field.label} must be greater than or equal to 18`);
                    }
                    else if (field.id === 'number') {
                        schema[field.id] = (schema[field.id] as Yup.NumberSchema).test(
                            'is-10-digits',
                            `${field.label} must be exactly 10 digits`,
                            (value) => {
                                if (value === undefined || value === null) return true; 
                                const stringValue = value?.toString(); 
                                return /^\d{10}$/.test(stringValue || ''); 
                            }
                        );
                    }
                    else if(field.id === 'sleep_hours'){
                        schema[field.id] = (schema[field.id] as Yup.NumberSchema).test(
                            'is greater than 5.5 hrs',
                            `${field.label} must be greater than 5.5 hours`,
                            (value) => {
                                if (value === undefined || value === null) return true; 
                                return value > 5.5; 
                            }
                        )
                    }
                    else if(field.id === 'water_intake'){
                        schema[field.id] = (schema[field.id] as Yup.NumberSchema).test(
                            'is greater than 4 litres',
                            `${field.label} must be greater than 4 litres`,
                            (value) => {
                                if (value === undefined || value === null) return true; 
                                return value >= 4; 
                            }
                        )
                    }
                break;
            
            case 'date':
                    schema[field.id] = Yup.date().nullable().required(`${field.label} is required`);
                    break;
                

            default:
                schema[field.id] = field.required   
                    ? Yup.string().required(`${field.label} is required`)
                    : Yup.string().optional();
        }
    });

    return Yup.object().shape(schema);
};

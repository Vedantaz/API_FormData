import * as  z from 'zod';
import { FormConfig, FormField } from '../types/formTypes';

export const createSchema = (fields: FormConfig) => {
    const schema: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field:FormField) => {

        if (field.required) {
          schema[field.id] = z.string().nonempty(`${field.label} is required`);
        } else {
          schema[field.id] = z.string().optional();
        }
    
        if (field.type === 'email') {
          const emailSchema = schema[field.id] as z.ZodString;
          schema[field.id] = emailSchema.email('Invalid email address');
      }
    
        if(field.type === 'password' ){
          schema[field.id] = z.string().min(8, 'Password must be at least 8 characters long')
          .regex(/[A-Z]/, 'Password must contain an uppercase letter')
          .regex(/\d/, 'Password must contain a number')
          .regex(/[@$!%*?&#]/, 'Password must contain a special character')
        }
        if(field.type === 'confirmPassword'){
          schema[field.id] = z.string().nonempty('Please confirm your password');
        }
        if (field.type === 'number') {
          schema[field.id] = z.number()
          .or(z.string().transform((val) => (val === '' ? undefined : Number(val))))
          .optional();
          
        }
      });

    return z.object(schema)
    .refine((data) => data.password === data.confirmPassword, {
      message : 'Passwords do not match',
      path: ['confirmPassword'],
    });
}
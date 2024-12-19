import * as  z from 'zod';
import { FormConfig } from '../types/formTypes';


export const createSchema = (fields: FormConfig) => {
    
    const schema: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field:any) => {
        if (field.required) {
          schema[field.id] = z.string().nonempty(`${field.label} is required`);
        } else {
          schema[field.id] = z.string().optional();
        }
    
        if (field.type === 'email') {
          schema[field.id] = z.string().email('Invalid email address');
        }
    
        if (field.type === 'number') {
          schema[field.id] = z.number()
          .or(z.string().transform((val) => (val === '' ? undefined : Number(val))))
          .optional();
          
        }
      });

    return z.object(schema);
}
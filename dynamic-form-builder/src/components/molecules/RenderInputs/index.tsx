import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface RenderInputsProps {
    field: {
        id: string;
        type: string;
        label: string;
        required?: boolean;
        options?: Array<{ value: string; label: string }>; 
    };
    error?: string;
}

const RenderInputs: React.FC<RenderInputsProps> = ({ field }) => {
    const { id, type, label, options } = field;

    return (
        <div>
            {type === 'select' && Array.isArray(field.options) ? (
                <Field name={id} as="select">
                    <option value="">Select {field.label}</option>
                    {options?.map((option) => (
                        typeof option === 'string' ? (
                            <option key={option} value={option}>
                            {option}
                        </option>
                        ) : (
                            <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        )
                    ))}
                </Field>
            ) : (type === 'gender') ? (
                // gender dropdown
                <Field name={id} as="select"> 
                    <option value="">Select Gender</option>
                    {options?.map((option) => (
                        typeof option === 'string' ? (
                            <option key={option} value={option}>
                            {option}
                        </option>
                        ) : (
                            <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        )
                    ))}
                </Field>
            ) : (
                <Field
                    name={id}
                    as={type === 'textarea' ? 'textarea' : 'input'}
                    type={type !== 'textarea'  ? field.type : undefined}
                    placeholder={label}
                />
            )}
            <ErrorMessage name={id} component="p" />
        </div>
    );
};

export default RenderInputs;
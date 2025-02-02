

import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface RenderInputsProps {
    field: {
        id: string;
        type: string;
        label: string;
        required?: boolean;
        options?: Array<{ value: string; label: string }>;
        category: string;
    };
    error?: string;
}

const RenderInputs: React.FC<RenderInputsProps> = ({ field }) => {
    const { id, type, label, options } = field;


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {type === 'select' && Array.isArray(options) ? (
                <Field name={id} as="select" className={`input-field ${id === 'country' ? 'country-select' : ''}`}>
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={typeof option === 'string' ? option : option.value}
                            value={typeof option === 'string' ? option : option.value}>
                            {typeof option === 'string' ? option : option.label}
                        </option>
                    ))}
                </Field>
            ) : type === 'number' ? (
                <Field
                    name={id}
                    type="number"
                    placeholder={label}
                    className="input-field"
                    step="1"
                    onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                />
            ) : (
                <Field
                    name={id}
                    as={type === 'textarea' ? 'textarea' : 'input'}
                    type={type !== 'textarea' ? type : undefined}
                    placeholder={label}
                    className="input-field"
                />
            )}
            <ErrorMessage name={id} component="p" className="error-message" />



        </LocalizationProvider>



    );
};

export default RenderInputs;

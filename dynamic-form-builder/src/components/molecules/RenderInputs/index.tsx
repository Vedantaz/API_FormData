
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import './styles.css'
interface RenderInputsProps {
    field: {
        id: string;
        type: string;
        label: string;
        required?: boolean;
        options?: Array<{ value: string; label: string }>;
        // options?: string;
        category: string;
    };
    error?: string;
}


const RenderInputs: React.FC<RenderInputsProps> = ({ field }) => {
    const { id, type, label, options, category } = field;


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            {type === 'select' && Array.isArray(options) ? (
                <Field name={id} as="select" className={`input-field ${id === 'country' ? 'country-select' : ''}`}>

                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option
                            key={typeof option === 'string' ? option : option.value}
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
            )  : (
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
        // <>
        //     <LocalizationProvider dateAdapter={AdapterDayjs}>

        //         <h3>Personal Info</h3>
        //         {type === 'select' && category === 'personal' && Array.isArray(options) ? (
        //             <Field
        //                 name={id}
        //                 as="select"
        //                 className={`input-field ${id === 'country' ? 'country-select' : ''}`}
        //             >
        //                 <option value="">Select {label}</option>
        //                 {options?.map((option: object) => (
        //                     <option key={option.toString()} value={option.toString()}>
        //                         {option.toString()}
        //                     </option>
        //                 ))}

        //             </Field>
        //         ) : type === 'number' && category=== 'personal' ? (
        //             <Field
        //                 name={id}
        //                 type="number"
        //                 placeholder={label}
        //                 className="input-field"
        //                 step="1"
        //                 onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
        //                 onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
        //                     e.target.value = e.target.value.replace(/[^0-9]/g, '');
        //                 }}
        //             />
        //         ) : ( <h1></h1>

        //         )}
        //         <ErrorMessage name={id} component="p" className="error-message" />
        //     </LocalizationProvider>

        // </>



    );
};

export default RenderInputs;


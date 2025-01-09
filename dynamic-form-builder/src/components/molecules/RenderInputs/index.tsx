
// import React from 'react';
// import { Field, ErrorMessage } from 'formik';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import  Grid  from '@mui/material/Grid';
// import BMI from '../BMI'; 
// import { fetchFormConfig } from '../../../services/api';

// interface RenderInputsProps {
//     field: {
//         id: string;
//         type: string;
//         label: string;
//         required?: boolean;
//         options?: Array<{ value: string; label: string }>;
//         category: string;
//     };
//     error?: string;
// }

// const RenderInputs: React.FC<RenderInputsProps> = ({ field  }) => {
//     const { id, type, label, options } = field;
//     const [height, setHeight] = React.useState('');
//     const [weight, setWeight] = React.useState('');

//         const [bmi, setBmi] = React.useState<number | null>(null);
//         const [category, setCategory] = React.useState<string>('');


//     const calculateBMI = ()=>{
//         const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
//             const bmiValue = parseFloat(weight) / (heightInMeters ** 2);
//             setBmi(bmiValue);

//             if (bmiValue < 18.5) setCategory('Underweight');
//             else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory('Normal weight');
//             else if (bmiValue >= 25 && bmiValue < 29.9) setCategory('Overweight');
//             else setCategory('Obese');
//     }



//     const handleInput = (e : React.ChangeEvent<HTMLInputElement> )=> {
//         const value = e.target.value;
//         if(id === 'height') setHeight(value);
//         else if(id === 'weight') setWeight(value);
//     }

//     return (    
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             {type === 'select' && Array.isArray(options) ? (
//                 <Field name={id} as="select" className={`input-field ${id === 'country' ? 'country-select' : ''}`}>
//                     <option value="">Select {label}</option>
//                     {options.map((option) => (
//                         <option
//                             key={typeof option === 'string' ? option : option.value}
//                             value={typeof option === 'string' ? option : option.value}>
//                             {typeof option === 'string' ? option : option.label}
//                         </option>
//                     ))}
//                 </Field>
//             ) : type === 'number' ? (
//                 <Field
//                     name={id}
//                     type="number"
//                     placeholder={label}
//                     className="input-field"
//                     step="1"
//                     onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
//                     onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
//                         e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                     }}

//                 />
//             ) : type === 'number' && id === 'height' ? (
//                 <Field
//                     name={id}
//                     type="number"
//                     placeholder={label}
//                     className="input-field"
//                     step="1"

//                 />
//             ):
//              (
//                 <Field
//                     name={id}
//                     as={type === 'textarea' ? 'textarea' : 'input'}
//                     type={type !== 'textarea' ? type : undefined}
//                     placeholder={label}
//                     className="input-field"
//                 />
//             )}
//             <ErrorMessage name={id} component="p" className="error-message" />
//             <BMI ht={height} wt={weight} />

//         </LocalizationProvider>
//     );
// };

// export default RenderInputs;

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

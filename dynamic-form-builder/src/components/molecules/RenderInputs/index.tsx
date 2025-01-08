
// import React from 'react';
// import { Field, ErrorMessage } from 'formik';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { fetchFormConfig } from '../../../services/api';
// import Typography from '@mui/material/Typography';
// import BMI from '../BMI';
// import Grid from '@mui/material/Grid';


// interface RenderInputsProps {
//     field: {
//         id: string;
//         type: string;
//         label: string;
//         required?: boolean;
//         options?: Array<{ value: string; label: string }>;
//         // options?: string;
//         category: string;
//     };
//     error?: string;
//     fetchFormConfig : () => Promise<any>;
// }

// const RenderInputs: React.FC<RenderInputsProps> = ({ field, fetchFormConfig }) => {
//     const { id, type, label, options } = field;
//     const [formConfig, setFormConfig] = React.useState<any[]>([]);

//     React.useEffect(() => {
//         const fetchConfig = async () => {
//             try {
//                 const data = await fetchFormConfig();
//                 setFormConfig(data); 
//             } catch (error) {
//                 console.error('Failed to fetch form config:', error);
//             }
//         };

//         fetchConfig();
//     }, [fetchFormConfig]);

//     const ht = formConfig.find((field) => field.id === 'height');
//     const wt = formConfig.find((field) => field.id === 'weight');
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs} >
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
//             ) : (
//                 <Field
//                     name={id}
//                     as={type === 'textarea' ? 'textarea' : 'input'}
//                     type={type !== 'textarea' ? type : undefined}
//                     placeholder={label}
//                     className="input-field"
//                 />
//             )}
//             <ErrorMessage name={id} component="p" className="error-message" />
//             {(id === 'height' || id === 'weight') && ht && wt && (
//                 <Grid item xs={12}>
//                     <BMI ht={ht} wt={wt} />
//                 </Grid>
//             )}
//         </LocalizationProvider>

//     );
// };

// export default RenderInputs;



import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  Grid  from '@mui/material/Grid';
import BMI from '../BMI'; 

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
    fetchFormConfig:() => Promise<Array<{ id: string; value: number }>> ; // Assuming fetchFormConfig is an array
}

const RenderInputs: React.FC<RenderInputsProps> = ({ field,  }) => {
    const { id, type, label, options } = field;
    const [formConfig] = React.useState<Array<{ id: string; value: number }>>([]);

    const heightField = formConfig.find((field) => field.id === 'height');
    const weightField = formConfig.find((field) => field.id === 'weight');
    
    const ht = heightField ? heightField.value : '';
    const wt = weightField ? weightField.value : ''; 

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

            {(id === 'height' || id === 'weight') && ht && wt && (
                <Grid item xs={12}>
                    <BMI ht={ht.toString()} wt={wt.toString()} />
                </Grid>
            )}
        </LocalizationProvider>
    );
};

export default RenderInputs;


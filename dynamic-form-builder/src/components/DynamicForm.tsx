
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RenderInputs from './molecules/RenderInputs';
import { FormConfig, FormField } from '../types/formTypes';
import { fetchFormConfig, submitFormData } from '../services/api';
import { createSchema } from '../utils/schema';
import { Formik, Field, Form, FormikHelpers } from 'formik';

type FormData = Record<string, string|number>;

const DynamicForm: React.FC<{ onSubmitData: (data : FormField) => void }> = ({ onSubmitData }) => {

    const [formConfig, setFormConfig] = useState<FormConfig>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schema, setSchema] = useState<any>(null);


    const loadFormConfig = async() =>{
        try{
            const config = await fetchFormConfig();
            setFormConfig(config);
            setSchema(createSchema(config));
            setLoading(false);
        }catch(err:any){
            setError(err.message || 'Failed to load form configuration');
            setLoading(false);
        }
    }

    const { register, handleSubmit, formState: { errors }, reset } = 
        useForm<FormData>({
            resolver: schema ? zodResolver(schema) : undefined,
            defaultValues: {},  
        });

    useEffect(() => {

        loadFormConfig();

    }, []);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        try {
            const res = await submitFormData(data);
            alert(res.message);
            reset({});
            localStorage.setItem('formData', JSON.stringify(data))


        } catch (err: any) {
            alert(err.message || 'Failed to submit the form');
        }
    };

    // const onSubmitFormik: SubmitHandler<FormData> = async (data : FormData) => {
    //     try {
    //         const res = await submitFormData(data);
    //         alert(res.message);
    //         localStorage.setItem('formData', JSON.stringify(data));

    //     } catch (err: any) {
    //         alert(err.message || 'Failed to submit the form');
            
    //     }
    // };

    if (loading || !schema) return <p>Loading form...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {formConfig?.map((field:FormField) => (
                <div key={field.id} style={{ marginBottom: '1rem' }}>
                    <label>
                        {field.label}
                        {field.required && '*'}
                    </label>
                    <RenderInputs key={field.id} field={field} register={register} error={errors[field.id]?.message as string}/>
                    
                    {errors[field.id]  &&
                        <p style={{ color: 'red' }}>
                            {errors[field.id]?.message as string}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;
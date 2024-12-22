
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSchema } from '../utils/schema';
import { fetchFormConfig, submitFormData } from '../services/api'
import { FormConfig } from '../types/formTypes';
import RenderInputs from './molecules/RenderInputs';

const DynamicForm: React.FC<{ onSubmitData: (data: any) => void }> = ({ onSubmitData }) => {

    const [formConfig, setFormConfig] = useState<FormConfig>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schema, setSchema] = useState<any>(null);

    type FormData = Record<string, any>;

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

    // preload saved data from localStorage
    const preloadSavedData = () => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    };  

    const { handleSubmit, formState: { errors }, reset } = 
        useForm<FormData>({
            resolver: schema ? zodResolver(schema) : undefined,
            // defaultValues:  preloadSavedData(),
            defaultValues:  {},  
        });

    useEffect(() => {

        loadFormConfig();
        
        reset({});
        // retrieiving the data and pre-populate the form
        // const savedData = preloadSavedData();

        // Object.keys(savedData).forEach((key)=>{
        //     setValue(key, savedData[key]);
        // });

    }, [reset]);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const res = await submitFormData(data);
            alert(res.message);
            localStorage.setItem('formData', JSON.stringify(data));
            localStorage.removeItem('formData');
            reset({});
            onSubmitData(data);

        } catch (err: any) {
            alert(err.message || 'Failed to submit the form');
        }
    };

    if (loading) return <p>Loading form...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formConfig?.map((field: any) => (
                <div key={field.id} style={{ marginBottom: '1rem' }}>
                    <label>
                        {field.label}
                        {field.required && '*'}
                    </label>
                    <RenderInputs key={field.id} field={field}/>
                    {/* {field.type === 'select' ? (
                        <select {...register(field.id)} defaultValue="">
                            <option value="">Select</option>
                            {field.options?.map((option: any) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input type={field.type} {...register(field.id)} defaultValue="" />
                    )} */}
                    {errors[field.id] &&
                        <p style={{ color: 'red' }}>
                            {errors[field.id]?.message as string}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;
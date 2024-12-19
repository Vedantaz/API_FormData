
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSchema } from '../utils/schema';
import { FormConfig } from '../types/formTypes';
import { fetchFormConfig, submitFormData } from '../services/api';

const formConfig: FormConfig = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'age', label: 'Age', type: 'number', required: false },
    { id: 'country', label: 'Country', type: 'select', options: ['USA', 'India'], required: true },
];

const schema = createSchema(formConfig);

const DynamicForm: React.FC<{ onSubmitData: (data: any) => void }> = ({ onSubmitData }) => {

    const [formConfig, setFormConfig] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schema, setSchema] = useState<any>(null);


    const {
        register, handleSubmit, setValue, formState: { errors }, } = useForm({
            resolver: zodResolver(schema),
        });


    useEffect(() => {
        const loadFormConfig = async () => {
            try {
                const config = await fetchFormConfig();
                setFormConfig(config);
                setSchema(createSchema(config)); // Generate schema dynamically
            } catch (err: any) {
                setError(err.message || 'Failed to load form configuration');
            } finally {
                setLoading(false);
            }
        };
        loadFormConfig();


        // retrieiving the data and pre-populate the form
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);


            setValue('name', parsedData.name);
            setValue('age', parsedData.age);
            setValue('name', parsedData.name);
            setValue('country', parsedData.country);

            Object.keys(parsedData).forEach((key) => {
                setValue(key, parsedData[key]);
            });
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const res = await submitFormData(data);
            alert(res.message);
            localStorage.setItem('formdata', JSON.stringify(data));
            onSubmitData(data);
            const savedData = localStorage.getItem('formData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                try {
                    const response = await fetch('http://localhost:4000/api/saveFormData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(parsedData),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send data');
                    }

                    console.log('Data sent successfully');
                } catch (error) {
                    console.error('Error sending data to server:', error);
                }
            }
        } catch (err: any) {
            alert(err.message || 'Failed to submit the form');
        }

    };

    if (loading) return <p>Loading form...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formConfig.map((field: any) => (
                <div key={field.id} style={{ marginBottom: '1rem' }}>
                    <label>
                        {field.label}
                        {field.required && '*'}
                    </label>
                    {field.type === 'select' ? (
                        <select {...register(field.id)}>
                            <option value="">Select</option>
                            {field.options?.map((option: any) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input type={field.type} {...register(field.id)} />
                    )}
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
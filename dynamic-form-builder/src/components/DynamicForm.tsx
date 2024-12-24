import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import RenderInputs from './molecules/RenderInputs';
import { FormConfig, FormField } from '../types/formTypes';
import { fetchFormConfig, submitFormData } from '../services/api';
import { createSchema } from '../utils/schema';

type FormData = Record<string, string | number | boolean>;

const DynamicForm: React.FC<{ onSubmitData: (data: FormField) => void }> = ({ onSubmitData }) => {
    const [formConfig, setFormConfig] = useState<FormConfig>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [validationSchema, setValidationSchema] = useState<any>(null);

    const loadFormConfig = async () => {
        try {
            const config = await fetchFormConfig();
            setFormConfig(config);
            const schema = createSchema(config); 
            setValidationSchema(schema);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || 'Failed to load form configuration');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFormConfig();
    }, []);

    const initialValues: FormData = formConfig.reduce((acc, field) => {
        acc[field.id] = field.type === 'checkbox' ? false : '';
        return acc;
    }, {} as FormData);

    const handleSubmit = async (
        values: FormData,
        { setSubmitting, resetForm }: FormikHelpers<FormData>
    ) => {
        try {
            const res = await submitFormData(values);
            alert(res.message);
            localStorage.setItem('formData', JSON.stringify(values));
            resetForm();
        } catch (err: any) {
            alert(err.message || 'Failed to submit the form');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !validationSchema) return <p>Loading form...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {formConfig.map((field : FormField) => (
                        <div key={field.id} style={{ marginBottom: '1rem' }}>
                            <label>
                                {field.label}
                                {field.required && '*'}
                            </label>
                            <RenderInputs field={field} />
                        </div>
                    ))}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;

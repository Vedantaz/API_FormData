import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import RenderInputs from '../../molecules/RenderInputs';
import { FormConfig, FormField } from '../../../types/formTypes';
import { fetchFormConfig, submitFormData } from '../../../services/api';
import { createSchema } from '../../../utils/schema';
import { useQuery } from '@tanstack/react-query';
import './styles.css'

type FormData = Record<string, string | number | boolean>;

type DynamicFormProps = {
    onSubmitData: (data: FormData) => void;
  };

const useFormConfig = () => {
    return useQuery<FormConfig, Error>(
        {
            queryKey: ['formConfig'],
            queryFn: fetchFormConfig,
            staleTime: 300000,
            retry: 2,
        }

    )
}

const getInitialValues = (formConfig: FormConfig): FormData =>
    formConfig.reduce((acc, field) => {
        acc[field.id] = field.type === 'checkbox' ? false : '';
        return acc;
    }, {} as FormData);

const DynamicForm: React.FC<DynamicFormProps> = ({onSubmitData}) => {

    const { data: formConfig, isLoading, isError, error } = useFormConfig();
    if (isLoading) return <p>Loading form...</p>;
    if (isError || !formConfig) return <p style={{ color: 'red' }}>{error?.message}</p>;

    const validationSchema = createSchema(formConfig);
    const initialValues = getInitialValues(formConfig);   // always validate before initializing it 

    const handleSubmit = async (
        values: FormData,
        { setSubmitting, resetForm }: FormikHelpers<FormData>
    ) => {
        try {
            const res = await submitFormData(values);
            alert(res.message);
            localStorage.setItem('formData', JSON.stringify(values));
            onSubmitData(values);
            resetForm();
        } catch (err: any) {
            alert(err.message || 'Failed to submit the form');
        } finally { 
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>

            {({ isSubmitting }) => (
                <Form>  
                    {formConfig.map((field: FormField) => (
                        <div key={field.id} style={{    display: "flex",
                                flexDirection: "column",
                                alignItems: "center"}}>

                            <RenderInputs field={field} />
                        </div>
                    ))}
                    <button className='btn' type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;
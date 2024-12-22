import { FormConfig, FormField } from "../../../types/formTypes";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { UseFormRegister } from 'react-hook-form';

type FormData = Record<string, any>;

type RenderInputProps = {
    field: FormField;
};


const RenderInputs: React.FC<RenderInputProps> = ({ field }) => {
    const [schema, setSchema] = useState<any>(null);

    const {
        register, handleSubmit, formState: { errors }, reset } =
        useForm<FormData>({
            resolver: schema ? zodResolver(schema) : undefined,
            // defaultValues:  preloadSavedData(),
            defaultValues: {},
        });


    const commonProps = {
        ...register(field.id as keyof FormData),
        defaultValue: "",
    }
    switch (field.type) {
        case "select":
            return (
                <select {...commonProps}>
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        case "number":
            return <input type="number" {...commonProps} />;
        case "password":
            return <input type="password" {...commonProps} />;
        case "textarea":
            return <textarea {...commonProps} />;
        case "checkbox":
            return (
                <input
                    type="checkbox"
                    {...commonProps}
                    value="checked"
                    defaultChecked={false}
                />
            );
        case "radio":
            return (
                <div>
                    {field.options?.map((option) => (
                        <label key={option}>
                            <input type="radio" value={option} {...commonProps} />
                            {option}
                        </label>
                    ))}
                </div>
            );
        default:
            return <input type={field.type} {...commonProps} />;
    }
}
export default RenderInputs;

import { UseFormRegister } from 'react-hook-form';

import { FormField } from '../../../types/formTypes';


type RenderInputProps = {
    field: FormField;
    register : UseFormRegister<Record<string, any>>;
    error?: string
};

const RenderInputs: React.FC<RenderInputProps> = ({ field, register }) => {

    const commonProps = {
        ...register(field.id, {
            required: field.required ?`${field.label} is required` : false,
        }),
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
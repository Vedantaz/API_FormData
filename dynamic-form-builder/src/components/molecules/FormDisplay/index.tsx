import React from "react";
type FormData = Record<string, string | number>;

const FormDisplay: React.FC<{ formData: FormData }> = ({ formData }) => {
    return (
      <div>
        <h2>Submitted Data</h2>
        <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    );
  };
  
  export default FormDisplay;
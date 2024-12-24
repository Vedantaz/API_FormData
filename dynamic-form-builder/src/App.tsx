import React, { useState } from 'react'
import './App.css'
import DynamicForm from './components/DynamicForm';
import FormDisplay from './components/molecules/FormDisplay';


const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dynamic Form Builder</h1>
      <DynamicForm onSubmitData={handleFormSubmit} />
      {formData && <FormDisplay formData={formData} />}
    </div>
  );
}
export default App

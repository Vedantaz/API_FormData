import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import FormDisplay from './components/FormDisplay';
import DynamicForm from './components/DynamicForm';


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

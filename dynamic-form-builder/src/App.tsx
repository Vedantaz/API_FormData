import React, { useState } from 'react'
import './App.css'
import DynamicForm from './components/organisms/DynamicForm';
import FormDisplay from './components/molecules/FormDisplay';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();



const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '2rem' }}>
      <h1>Dynamic Form Builder</h1>
      <DynamicForm onSubmitData={handleFormSubmit} />
      {formData && <FormDisplay formData={formData} />}
    </div>
    </QueryClientProvider>
    
  );
}
export default App

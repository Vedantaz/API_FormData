import React, { useState } from 'react'
import './App.css'
import ProtectedRoute from './components/molecules/ProtectedRoute';
import DynamicForm from './components/organisms/DynamicForm';
import FormDisplay from './components/molecules/FormDisplay';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/molecules/Login';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ padding: '2rem' }}>
          <h1>Dynamic Form Builder</h1>

          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/form" element={
              <ProtectedRoute>
                <DynamicForm onSubmitData={handleFormSubmit} />

              </ProtectedRoute>
            } />
            <Route path="/form-data" element={
              <ProtectedRoute>
                {formData ? <FormDisplay formData={formData} /> : <Navigate to="/form" />}

              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>


        </div>
      </Router>


    </QueryClientProvider>

  );
}
export default App

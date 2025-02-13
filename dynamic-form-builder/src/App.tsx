import React from 'react'
import './App.css'
import ProtectedRoute from './components/molecules/ProtectedRoute';
import DynamicForm from './components/organisms/DynamicForm';
import FormDisplay from './components/molecules/FormDisplay';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/molecules/Login';
// import SuggestionBox from './components/organisms/Nutritions';
import Navbar from './components/organisms/Navbar';
import HomePage from './pages/HomePage';
// import NutritionFood from './components/organisms/Nutritions';
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [formData, setFormData] = React.useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div style={{ padding: '2rem' }}>
          <h1>Forms</h1>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/form" element={
              <ProtectedRoute>
                <DynamicForm onSubmitData={handleFormSubmit} />

              </ProtectedRoute>
            } />

            <Route path="/form-data" element={
              <ProtectedRoute>
                {formData ? <FormDisplay formData={formData} /> : <Navigate to="/form" replace />}
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/HomePage" element={<HomePage/>} />

          </Routes>


        </div>
      </Router>
    </QueryClientProvider>

  );
}
export default App
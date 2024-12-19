export const fetchFormConfig = async () => {
    const response = await fetch('http://localhost:4000/api/forms/config');
    if (!response.ok) throw new Error('Failed to fetch form configuration');
    return response.json();
  };
  
  export const submitFormData = async (data: any) => {
    const response = await fetch('http://localhost:4000/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Form submission failed');
    return response.json();
  };
  
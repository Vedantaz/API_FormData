import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';

const BlogEditorPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ title: '', content: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="title" as={TextField} label="Title" fullWidth />
        <Field name="content" as={TextField} label="Content" fullWidth multiline rows={4} />
        <button type="submit">Save Blog</button>
      </Form>
    </Formik>
  );
};

export default BlogEditorPage;

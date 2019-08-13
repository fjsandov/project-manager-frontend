import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Form as UIForm, Datepicker } from 'react-formik-ui';

export default function TaskForm({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
  buttonText,
}) {
  return (
    <UIForm mode='structured' noValidate onSubmit={handleSubmit}>
      <FormControl
        name="title"
        placeholder="Title"
        value={values.title}
        error={errors.title}
        isInvalid={!!errors.title}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.title}
      </Form.Control.Feedback>
      <FormControl
        name="description"
        placeholder="Description"
        value={values.description}
        error={errors.description}
        isInvalid={!!errors.description}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text-area"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.description}
      </Form.Control.Feedback>
      <Datepicker name='deadline' label='Deadline' />
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        {buttonText}
      </Button>
    </UIForm>
  );
}
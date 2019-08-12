import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Form as UIForm, Datepicker } from 'react-formik-ui';

export default function ProjectForm({
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
        name="name"
        placeholder="Name"
        value={values.name}
        error={errors.name}
        isInvalid={!!errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.name}
      </Form.Control.Feedback>
      <FormControl
        name="projectType"
        placeholder="project type"
        value={values.projectType}
        error={errors.projectType}
        isInvalid={!!errors.projectType}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.projectType}
      </Form.Control.Feedback>
      <Datepicker name='startAt' label='Start' />
      <Datepicker name='endAt' label='End' />
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
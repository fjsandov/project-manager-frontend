import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React from 'react';

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
    <Form noValidate onSubmit={handleSubmit}>
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
      <FormControl
        name="startAt"
        placeholder="Start"
        value={values.startAt}
        error={errors.startAt}
        isInvalid={!!errors.startAt}
        onChange={handleChange}
        onBlur={handleBlur}
        type="date"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.startAt}
      </Form.Control.Feedback>
      <FormControl
        name="endAt"
        placeholder="End"
        value={values.endAt}
        error={errors.endAt}
        isInvalid={!!errors.endAt}
        onChange={handleChange}
        onBlur={handleBlur}
        type="date"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.endAt}
      </Form.Control.Feedback>
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        {buttonText}
      </Button>
    </Form>
  );
}
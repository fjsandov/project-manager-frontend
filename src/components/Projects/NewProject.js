import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {compose} from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createProject } from '../../store/ducks/projects';
import FormControl from 'react-bootstrap/FormControl';

function NewProject({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
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
        Create project
      </Button>
    </Form>
  );
}

const mapDispatchToProps = {
  onCreateProject: createProject,
};

export default compose(
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      projectType: '',
      startAt: undefined,
      endAt: undefined,
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      projectType: Yup.string().required(),
      startAt: Yup.date().required(),
      endAt: Yup.date().required(),
    }),
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onCreateProject(values).catch(() => setSubmitting(false)),
  })
)(NewProject);
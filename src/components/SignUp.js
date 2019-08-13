import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {compose} from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../store/ducks/session';
import FormControl from 'react-bootstrap/FormControl';

function SignUp({
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
        name="email"
        placeholder="Email"
        value={values.email}
        error={errors.email}
        isInvalid={!!errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
      <FormControl
        name="password"
        placeholder="Password"
        value={values.password}
        error={errors.password}
        isInvalid={!!errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>
      <FormControl
        name="passwordConfirmation"
        placeholder="Confirm your password"
        value={values.passwordConfirmation}
        error={errors.passwordConfirmation}
        isInvalid={!!errors.passwordConfirmation}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.passwordConfirmation}
      </Form.Control.Feedback>
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        Sign up
      </Button>
    </Form>
  );
}

const mapDispatchToProps = {
  onSignUp: signUp,
};

export default compose(
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: '',
      passwordConfirmation: '',
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
      passwordConfirmation: Yup.string().required(),
    }),
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onSignUp(values).catch(() => setSubmitting(false)),
  })
)(SignUp);
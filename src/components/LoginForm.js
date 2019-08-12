import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function LoginForm({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
}) {
  return (
    <Form inline onSubmit={handleSubmit}>
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
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        Log in
      </Button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
  handleSubmit: (values, { props, setSubmitting }) =>
    props.onLogin(values).catch(() => setSubmitting(false)),
})(LoginForm);
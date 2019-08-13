import React from 'react';
import { withFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form as UIForm } from 'react-formik-ui';
import commentSchema from '../../schemas/comment';

function CommentForm({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
}) {
  return (
    <UIForm mode='structured' noValidate onSubmit={handleSubmit}>
      <Form.Control
        as="textarea"
        rows="3"
        name="body"
        placeholder="Add a comment"
        value={values.body}
        error={errors.body}
        isInvalid={!!errors.body}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mr-sm-2"
      />
      <Form.Control.Feedback type="invalid">
        {errors.body}
      </Form.Control.Feedback>
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="outline-success"
      >
        Add comment
      </Button>
    </UIForm>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    body: '',
  }),
  validationSchema: commentSchema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) =>
    props.onCreateComment(props.commentableId, { ...values })
      .then(() => resetForm())
      .finally(() => setSubmitting(false)),
})(CommentForm);
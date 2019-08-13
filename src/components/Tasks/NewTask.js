import React from 'react';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createTask } from '../../store/ducks/tasks';
import TaskForm from './TaskForm';
import taskSchema from '../../schemas/task';

const mapDispatchToProps = {
  onCreateTask: createTask,
};

export default compose(
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      title: '',
      description: '',
      status: '',
      priority: '',
      deadline: undefined,
    }),
    validationSchema: taskSchema,
    handleSubmit: (values, { props: { onCreateTask, match: { params } }, setSubmitting }) =>
      onCreateTask({ projectId: params.projectId,  ...values })
        .catch(() => setSubmitting(false)),
  })
)((props) => <TaskForm {...props} buttonText="Create task" />);
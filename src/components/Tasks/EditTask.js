import React from 'react';
import { withFormik } from 'formik';
import pick from 'lodash/pick';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateTask, getTask } from '../../store/ducks/tasks';
import TaskForm from './TaskForm';
import taskSchema from '../../schemas/task';
import { dateToString } from '../../utils/dates';

function mapStateToProps(state, { match: { params: { id, projectId } } }) {
  return {
    task: getTask(state, { id, projectId })
  };
}

const mapDispatchToProps = {
  onUpdateTask: updateTask,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ task }) => ({
      ...pick(task, 'title', 'status', 'priority'),
      description: task.description || undefined,
      deadline: dateToString(task.deadline),
    }),
    validationSchema: taskSchema,
    handleSubmit: (values, { props: { onUpdateTask, match: { params } }, setSubmitting }) =>
      onUpdateTask({ id: params.id, projectId: params.projectId,  ...values })
        .catch(() => setSubmitting(false)),
  })
)((props) => <TaskForm {...props} buttonText="Update task" />);
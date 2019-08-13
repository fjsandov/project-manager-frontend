import React, { useEffect, useCallback } from 'react';
import { withFormik } from 'formik';
import pick from 'lodash/pick';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateTask, getTask } from '../../store/ducks/tasks';
import TaskForm from './TaskForm';
import taskSchema from '../../schemas/task';
import { dateToString } from '../../utils/dates';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Comments from '../Comments';
import {
  getTaskComments,
  fetchTaskComments,
  createTaskComment,
  deleteTaskComment,
} from '../../store/ducks/comments';

function EditTask({
  projectId,
  comments,
  fetchComments,
  onCreateComment,
  onDeleteComment,
  ...rest
}) {
  const { id: taskId } = rest.task;
  useEffect(
    () => {
      fetchComments(projectId, taskId);
    },
    [projectId, taskId, fetchComments],
  );
  const handleCreateComment = useCallback(
    (specificTaskId, formValues) => onCreateComment(projectId, specificTaskId, formValues),
    [projectId, onCreateComment],
  );
  const handleDeleteComment = useCallback(
    (specificTaskId, commentId) => onDeleteComment(projectId, specificTaskId, commentId),
    [projectId, onDeleteComment],
  );
  return (
    <Container>
      <Row>
        <Col>
          <TaskForm {...rest} buttonText="Update task" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Comments
            commentableId={taskId}
            comments={comments}
            onCreateComment={handleCreateComment}
            onDeleteComment={handleDeleteComment}
          />
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state, { match: { params: { id: taskId, projectId } } }) {
  return {
    task: getTask(state, { id: taskId, projectId }),
    comments: getTaskComments(state, { taskId }),
    projectId,
  };
}

const mapDispatchToProps = {
  onUpdateTask: updateTask,
  fetchComments: fetchTaskComments,
  onCreateComment: createTaskComment,
  onDeleteComment: deleteTaskComment,
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
)(EditTask);
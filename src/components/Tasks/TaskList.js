import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getTasks,
  fetchTasks,
  deleteTask,
} from '../../store/ducks/tasks';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { dateToString } from '../../utils/dates';

function TaskRow(projectId, { id, title, priority, deadline, status }, removeTask) {
  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{priority}</td>
      <td>{deadline ? dateToString(deadline) : '-'}</td>
      <td>{status}</td>
      <td>
        <ButtonGroup>
          <Link to={`/projects/${projectId}/tasks/${id}`}>
            <Button variant="primary">
              Show
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => removeTask(projectId, id)}
          >
            Destroy
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

function TaskList({ projectId, tasks, getTasksFromAPI, removeTask }) {
  useEffect(
    () => {
      getTasksFromAPI(projectId)
    },
    [projectId, getTasksFromAPI],
  );
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Title</th>
        <th>Priority</th>
        <th>Deadline</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {tasks && tasks.map((task) => TaskRow(projectId, task, removeTask))}
      </tbody>
    </Table>
  );
}

function mapStateToProps(state, props) {
  return {
    tasks: getTasks(state, props),
  };
}

const mapDispatchToProps = {
  getTasksFromAPI: fetchTasks,
  removeTask: deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
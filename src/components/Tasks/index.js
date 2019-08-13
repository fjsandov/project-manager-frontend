import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';

function Tasks({ projectId }) {
  return (
    <>
      <Link to={`/projects/${projectId}/tasks/new`}>
        <Button variant="primary">
          Add
        </Button>
      </Link>
      <TaskList projectId={projectId} />
    </>
  );
}

function mapStateToProps(state, { match: { params: { projectId } } }) {
  return {
    projectId,
  };
}

export default connect(mapStateToProps)(Tasks);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProjects, fetchProjects } from '../../store/ducks/projects';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function ProjectRow({ id, name, project_type, start_at, end_at }) {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{project_type}</td>
      <td>{start_at}</td>
      <td>{end_at}</td>
      <td>
        <ButtonGroup>
          <Button variant="primary">
            Show
          </Button>
          <Button variant="danger">
            Destroy
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

function ProjectList({ projects, getProjects }) {
  useEffect(
    () => {
      getProjects()
    },
    [getProjects],
  );
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Start at</th>
        <th>End at</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {projects.map(ProjectRow)}
      </tbody>
    </Table>
  );
}

function mapStateToProps(state) {
  return {
    projects: getProjects(state),
  };
}

const mapDispatchToProps = {
  getProjects: fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
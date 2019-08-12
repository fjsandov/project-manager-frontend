import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getProjects,
  fetchProjects,
  deleteProject,
} from '../../store/ducks/projects';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { dateToString } from '../../utils/dates';

function ProjectRow({ id, name, projectType, startAt, endAt }, removeProject) {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{projectType}</td>
      <td>{dateToString(startAt)}</td>
      <td>{dateToString(endAt)}</td>
      <td>
        <ButtonGroup>
          <Link to={`/projects/${id}`}>
            <Button variant="primary">
              Show
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => removeProject(id)}
          >
            Destroy
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

function ProjectList({ projects, getProjects, removeProject }) {
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
        {projects.map((project) => ProjectRow(project, removeProject))}
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
  removeProject: deleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
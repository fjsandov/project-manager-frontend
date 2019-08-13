import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../store/ducks/projects';
import Button from 'react-bootstrap/Button';
import ProjectsList from './ProjectsList';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <>
      <Link to="/projects/new">
        <Button variant="primary">
          Add
        </Button>
      </Link>
      <ProjectsList />
    </>
  );
}

const mapDispatchToProps = {
  addProject: fetchProjects,
};

export default connect(null, mapDispatchToProps)(Projects);
import React from 'react';
import Button from 'react-bootstrap/Button';
import ProjectsList from './ProjectsList';
import { Link } from 'react-router-dom';

export default function Projects() {
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
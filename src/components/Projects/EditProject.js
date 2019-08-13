import React from 'react';
import { withFormik } from 'formik';
import pick from 'lodash/pick';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { updateProject, getProject } from '../../store/ducks/projects';
import ProjectForm from './ProjectForm';
import projectSchema from '../../schemas/project';
import { dateToString } from '../../utils/dates';

function mapStateToProps(state, { match: { params: { id } } }) {
  return {
    project: getProject(state, { id })
  };
}

const mapDispatchToProps = {
  onUpdateProject: updateProject,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ project }) => ({
      ...pick(project, 'name', 'projectType'),
      startAt: dateToString(project.startAt),
      endAt: dateToString(project.endAt),
    }),
    validationSchema: projectSchema,
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onUpdateProject({ id: props.match.params.id, ...values })
        .catch(() => setSubmitting(false)),
  })
)((props) => (
  <>
    <ProjectForm {...props} buttonText="Update project" />
    <Link to={`/projects/${props.project.id}/tasks`}>
      <Button variant="primary">
        Show tasks
      </Button>
    </Link>
  </>
));
import React from 'react';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateProject, getProject } from '../../store/ducks/projects';
import ProjectForm from './ProjectForm';
import projectSchema from '../../schemas/project';

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
    mapPropsToValues: ({ project }) => project,
    validationSchema: projectSchema,
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onUpdateProject({ id: props.id, ...values })
        .catch(() => setSubmitting(false)),
  })
)((props) => <ProjectForm {...props} buttonText="Update project" />);
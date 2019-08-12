import React from 'react';
import { withFormik } from 'formik';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { createProject } from '../../store/ducks/projects';
import projectSchema from '../../schemas/project';
import ProjectForm from './ProjectForm';

const mapDispatchToProps = {
  onCreateProject: createProject,
};

export default compose(
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      projectType: '',
      startAt: undefined,
      endAt: undefined,
    }),
    validationSchema: projectSchema,
    handleSubmit: (values, { props, setSubmitting }) =>
      props.onCreateProject(values).catch(() => setSubmitting(false)),
  })
)((props) => <ProjectForm {...props} buttonText="Create project" />);
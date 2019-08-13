import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import pick from 'lodash/pick';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {
  updateProject,
  getProject,
} from '../../store/ducks/projects';
import {
  getProjectComments,
  fetchProjectComments,
  createProjectComment,
  deleteProjectComment,
} from '../../store/ducks/comments';
import ProjectForm from './ProjectForm';
import Comments from '../Comments';
import projectSchema from '../../schemas/project';
import { dateToString } from '../../utils/dates';

function EditProject({
  comments,
  fetchComments,
  onCreateComment,
  onDeleteComment,
  ...rest
}) {
  const projectId = rest.project.id;
  useEffect(
    () => {
      fetchComments(projectId);
    },
    [projectId, fetchComments],
  );
  return (
    <Container>
      <Row>
        <Col>
          <ProjectForm {...rest} buttonText="Update project" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={`/projects/${projectId}/tasks`}>
            <Button variant="primary">
              Show tasks
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Comments
            commentableId={projectId}
            comments={comments}
            onCreateComment={onCreateComment}
            onDeleteComment={onDeleteComment}
          />
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state, { match: { params: { id: projectId } } }) {
  return {
    project: getProject(state, { id: projectId }),
    comments: getProjectComments(state, { projectId }),
  };
}

const mapDispatchToProps = {
  onUpdateProject: updateProject,
  fetchComments: fetchProjectComments,
  onCreateComment: createProjectComment,
  onDeleteComment: deleteProjectComment,
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
)(EditProject);
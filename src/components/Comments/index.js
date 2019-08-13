import React, { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Comment from './Comment';
import CommentForm from './CommentForm';

const styles = {
  commentForm: {
    marginBottom: 50,
  },
  comment: {
    marginBottom: 30,
  },
};

function Comments({
  commentableId,
  comments,
  onCreateComment,
  onDeleteComment,
}) {
  const onDelete = useCallback(
    (commentId) => onDeleteComment(commentableId, commentId),
    [onDeleteComment, commentableId],
  );
  return (
    <Container>
      <Row style={styles.commentForm}>
        <Col>
          <h1>New comment</h1>
          <CommentForm
            commentableId={commentableId}
            onCreateComment={onCreateComment}
          />
        </Col>
      </Row>
      {isEmpty(comments)
        ? <h3>No comments</h3>
        : comments.reverse().map(comment => (
          <Row
            key={`comment-${comment.id}`}
            style={styles.comment}
          >
            <Col>
              <Comment
                comment={comment}
                onDelete={onDelete}
              />
            </Col>
          </Row>
        ))}
    </Container>
  );
}

export default Comments;
import React, { useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { dateTimeToString } from '../../utils/dates';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const styles = {
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
};

function Comment({
  comment: {
    id,
    body,
    createdAt,
  },
  onDelete,
}) {
  const handleDelete = useCallback(
    () => onDelete(id),
    [onDelete, id],
  );
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text style={styles.left}>
          <Container>
            <Row>
              <Col>
                {body}
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container>
          <Row>
            <Col md="9" style={styles.left}>
              {dateTimeToString(createdAt)}
            </Col>
            <Col md="3" style={styles.right}>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}

export default Comment;
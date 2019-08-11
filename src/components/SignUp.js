import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../store/ducks/session';

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const onSubmit = useCallback(
    () => onSignUp({ email, password, passwordConfirmation })
      .then(() => {
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
      }),
    [email, password, passwordConfirmation, onSignUp],
  );
  return (
    <Form>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password again"
          onChange={e => setPasswordConfirmation(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={onSubmit}
      >
        Sign up
      </Button>
    </Form>
  );
}

const mapDispatchToProps = {
  onSignUp: signUp,
};

export default connect(null, mapDispatchToProps)(SignUp);
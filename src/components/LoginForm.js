import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = useCallback(
    () => onLogin({ email, password })
      .then(() => {
        setEmail('');
        setPassword('');
      }),
    [email, password, onLogin],
  );
  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder="Email"
        className="mr-sm-2"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <FormControl
        type="password"
        placeholder="Password"
        className="mr-sm-2"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button
        variant="outline-success"
        onClick={onSubmit}
      >
        Log in
      </Button>
    </Form>
  );
}
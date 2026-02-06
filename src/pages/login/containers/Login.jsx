import Button from 'components/Button';
import React from 'react';
import { login } from 'app/actions/auth';

function Login() {
  return (
    <div style={{padding: 40, textAlign: 'center' }}>
      <h2>Please login</h2>
      <Button onClick={login}>Login with Google</Button>
    </div>
  )
}

export default Login;

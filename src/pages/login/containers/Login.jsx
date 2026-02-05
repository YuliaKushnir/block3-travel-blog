import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';
import React, { useEffect, useState } from 'react';

import * as errorCodes from '../constants/errorCodes';
import Typography from 'components/Typography';
import { login } from 'app/actions/auth';

function Login() {

  return (
    <div style={{padding: 40, textAlign: 'center' }}>
      <h2>Please login</h2>
      <button onClick={login}>Login with Google</button>
    </div>
    
  )
}

export default Login;

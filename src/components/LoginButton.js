import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-outline btn-block" style={{color: 'brown', borderColor: 'rgba(132, 214, 207, 1)'}}
      onClick={() => loginWithRedirect({redirectUri:"http://localhost:3000/creatorspage"})}
    >
      Log In
    </button>
  );
};

export default LoginButton;
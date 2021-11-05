import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-outline-danger"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      style={{
        width: '120px' 
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
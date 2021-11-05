import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {gql, useMutation} from '@apollo/client';

const SignupButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  const signup = async()=>{
   await loginWithRedirect({
      screen_hint: 'signup',
    });
    console.log(user);
  }

  return (
    <button
      className="btn btn-outline btn-block"
      style={{color: 'brown', borderColor: 'rgba(132, 214, 207, 1)'}}
      onClick={() =>{
        signup()
      }
      }
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
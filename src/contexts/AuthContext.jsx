/* eslint-disable react/prop-types */
import { WhoAmIRequest } from "../api";
import React, { useContext, useEffect, useState } from 'react';

export const AuthStatus = {
  Loading: 0,
  SignedIn: 1,
  SignedOut: 2,
};

const defaultState = {
  authStatus: AuthStatus.Loading,
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);

  useEffect(() => {
    async function getWhoAmI() {
      const res = await WhoAmIRequest();
      if (res !== "" && res) {
        setAuthStatus(AuthStatus.SignedIn);
      } else {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getWhoAmI().then();
  }, [setAuthStatus]);

  function signIn() {
    setAuthStatus(AuthStatus.SignedIn);
  }

  function signOut() {
    setAuthStatus(AuthStatus.SignedOut);
  }

  const state = {
    authStatus,
    signIn,
    signOut,
  };

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
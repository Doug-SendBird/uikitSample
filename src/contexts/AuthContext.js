import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

let initialState = {
  isAuthenticated: false,
  appId: null,
  userId: null,
  accessToken: null,
};

const authInfo = localStorage.getItem('auth_info');

if (authInfo) {
  initialState = JSON.parse(authInfo);
}

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(initialState);

  const onSignIn = (auth) => {
    const authInfo = {
      ...auth,
      isAuthenticated: true,
    };

    localStorage.setItem('auth_info', JSON.stringify(authInfo));
    setAuth(authInfo);
  };

  const onSignOut = () => {
    localStorage.removeItem('auth_info');
    setAuth({
      isAuthenticated: false,
      appId: null,
      userId: null,
      accessToken: null,
    });
  };

  const state = { auth };
  const actions = { onSignIn, onSignOut };
  return <Provider value={{ ...state, ...actions }}>{props.children}</Provider>;
};

const withAuthContext = () => (props) =>
  <AuthContext.Consumer>{props.children}</AuthContext.Consumer>;

export { AuthContext, AuthContextProvider, withAuthContext };

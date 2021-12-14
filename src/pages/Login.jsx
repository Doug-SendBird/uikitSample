import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { appData } from '../const';
import './Login.css';

export const Login = () => {
  const { auth, onSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState({
    userId: appData.userId,
    accessToken: appData.accessToken,
    loading: false,
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (location.pathname === '/login') {
        navigate('/page1');
      }
    }
  }, [auth, location, navigate]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      onSignIn({
        appId: appData.appId,
        userId: state.userId,
        accessToken: state.accessToken,
      });
    } catch (error) {}
  };

  return (
    <div style={{ display: 'block' }}>
      <div className="loginWrapper">
        <div className="loginWrapper2">
          <div className="loginBody">
            <div className="loginAuth">
              <div className="loginAuthHeader">
                <h1>Connect to your app</h1>
              </div>
              <div className="loginAuthForm">
                <Box border={1} borderRadius="4px" borderColor="#c9d0e6" padding={2}>
                  <div className="loginPaper">
                    <form className="loginAuthForm" onSubmit={submitForm}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User ID"
                        name="userId"
                        onChange={handleChange}
                        value={state.userId}
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="accessToken"
                        label="Access Token (Optional)"
                        name="accessToken"
                        onChange={handleChange}
                        value={state.accessToken}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={state.loading}
                        className="loginConnectBtn"
                      >
                        {state.loading ? <div>loading</div> : 'Connect'}
                      </Button>
                    </form>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

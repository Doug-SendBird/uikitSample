import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { SendBirdProvider } from 'sendbird-uikit';
import { ChatModal } from '../components/ChatModal';

SendbirdProvider.propTypes = {
  children: PropTypes.node,
};

export default function SendbirdProvider({ children }) {
  const { auth } = useAuth();
  const [state, setState] = useState({
    appId: auth.appId,
    userId: auth.userId,
    accessToken: auth.accessToken,
  });

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <SendBirdProvider appId={state.appId} userId={state.userId} accessToken={state.accessToken}>
        {children}
        <ChatModal parentSetState={setState} parentState={state} />
      </SendBirdProvider>
    );
  }
}

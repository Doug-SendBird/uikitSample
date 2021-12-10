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

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <SendBirdProvider appId={auth.appId} userId={auth.userId} accessToken={auth.accessToken}>
        {children}
        <ChatModal />
      </SendBirdProvider>
    );
  }
}

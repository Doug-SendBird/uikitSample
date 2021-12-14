import React, { useState, useEffect } from 'react';
import { Channel, useSendbirdStateContext, sendBirdSelectors } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import { Box, Fab, Card, Badge } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { PuffLoader } from 'react-spinners';
import { renewSessionToken } from '../api';
import { appData } from '../const';

export const ChatModal = ({ parentState, parentSetState }) => {
  const sbContext = useSendbirdStateContext();
  const sdkInstance = sendBirdSelectors.getSdk(sbContext);
  const [isActive, setActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    if (sbContext?.stores?.sdkStore?.error && !sbContext?.stores?.sdkStore?.initialized) {
      console.log('Token Expired');
      renewSessionToken(parentState.userId).then(({ token }) => {
        console.log('Token Renewed');
        parentSetState({
          ...parentState,
          accessToken: token,
        });
      });
    } else if (sbContext?.stores?.sdkStore?.initialized) {
      setIsLoading(false);
      if (sdkInstance && sdkInstance.isSessionOpened) {
        console.log(sdkInstance);
        setIsLoading(false);
        sdkInstance.getTotalUnreadMessageCount((count, error) => {
          setUnreadCount(count);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sbContext?.stores?.sdkStore?.error]);

  if (auth.isAuthenticated) {
    if (!isActive) {
      return (
        <Box sx={{ '& > :not(style)': { m: 1, position: 'fixed', bottom: 20, right: 20 } }}>
          <Badge badgeContent={unreadCount} color="error" invisible={unreadCount === 0}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                setActive(!isActive);
              }}
            >
              Chat
            </Fab>
          </Badge>
        </Box>
      );
    } else if (isLoading) {
      return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Card
            sx={{
              height: 800,
              width: 600,
              boxShadow: 10,
              borderRadius: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <PuffLoader color="purple" />
            </div>
          </Card>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ float: 'right', m: 1 }}
            onClick={() => {
              setActive(!isActive);
            }}
          >
            X
          </Fab>
        </Box>
      );
    } else {
      return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Card
            sx={{
              height: 800,
              width: 600,
              boxShadow: 10,
              borderRadius: 5,
            }}
          >
            <Channel channelUrl={appData.channelUrl} />
          </Card>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ float: 'right', m: 1 }}
            onClick={() => {
              setActive(!isActive);
            }}
          >
            X
          </Fab>
        </Box>
      );
    }
  } else {
    return <></>;
  }
};

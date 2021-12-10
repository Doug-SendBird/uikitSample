import React, { useState, useEffect } from 'react';
import { Channel, useSendbirdStateContext, sendBirdSelectors } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import { Box, Fab, Card, Badge } from '@mui/material';
import useAuth from '../hooks/useAuth';
const channel_url = 'sendbird_group_channel_133965944_826fbb10cb20fe33e31dc49fc9bed3a04abb97f5';

export const ChatModal = () => {
  const context = useSendbirdStateContext();
  const sdkInstance = sendBirdSelectors.getSdk(context);
  const [isActive, setActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    if (sdkInstance && sdkInstance.isSessionOpened) {
      sdkInstance.getTotalUnreadMessageCount((count, error) => {
        setUnreadCount(count);
      });
    }
  }, [sdkInstance]);

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
            <Channel channelUrl={channel_url} />
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

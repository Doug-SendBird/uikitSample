import React, { useState, useEffect } from 'react';
import { Channel, useSendbirdStateContext, sendBirdSelectors, withSendBird } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import { Box, Fab, Card, Badge } from '@mui/material';
import useAuth from '../hooks/useAuth';

const CustomComponent = ({ createChannel, sdk, leaveChannel }) => {
  const context = useSendbirdStateContext();
  const sdkInstance = sendBirdSelectors.getSdk(context);
  const [isActive, setActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [channelUrl, setChannelUrl] = useState('');
  const { auth } = useAuth();

  useEffect(() => {
    if (sdkInstance && sdkInstance.isSessionOpened && channelUrl !== "") {
      sdkInstance.GroupChannel.getChannel(channelUrl)
      .then(c => {
        setUnreadCount(c.unreadMessageCount);
      })
      .catch(c => console.warn(c));
    }
  }, [sdkInstance, channelUrl]);

  if (auth.isAuthenticated) {
    if (!isActive) {
      return (
        <Box sx={{ '& > :not(style)': { m: 1, position: 'fixed', bottom: 20, right: 20 } }}>
          <Badge badgeContent={unreadCount} color="error" invisible={unreadCount === 0}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                if (channelUrl==="") {
                  let params = new sdkInstance.GroupChannelParams();
                  params.isPublic = false;
                  params.isEphemeral = false;
                  params.isDistinct = true;
                  params.addUserIds(['RP1']);
                  params.name = "Recruitment Partner Chat";
                  createChannel(params)
                      .then(c => {
                          setChannelUrl(c.url);
                          setActive(!isActive);
                      })
                      .catch(c => console.warn(c));
                } else
                {
                  setActive(!isActive);
                }
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
            <Channel channelUrl={channelUrl} />
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

export const ChatModal = withSendBird(CustomComponent, (state) => {
  const createChannel = sendBirdSelectors.getCreateChannel(state);
  const leaveChannel = sendBirdSelectors.getLeaveChannel(state);
  const sdk = sendBirdSelectors.getSdk(state);
  return ({ createChannel, sdk, leaveChannel });
});
import axios from 'axios';
import { appData } from '../const.js';

export const renewSessionToken = (user_id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `https://api-${appData.appId}.sendbird.com/v3/users/${user_id}/token`,
        {},
        {
          headers: {
            'Api-Token': appData.apiToken,
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

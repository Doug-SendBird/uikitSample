import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export const Page2 = () => {
  const navigate = useNavigate();
  const { onSignOut } = useAuth();

  return (
    <div>
      <div>
        <h1>You're current on Page 2</h1>
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              navigate('/page1');
            }}
          >
            Go to Page 1
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/page3');
            }}
          >
            Go to Page 3
          </Button>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ m: 1 }} onClick={onSignOut}>
          <Button variant="contained">Sign Out</Button>
        </Stack>
      </div>
    </div>
  );
};

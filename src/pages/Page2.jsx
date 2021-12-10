import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

export const Page2 = () => {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

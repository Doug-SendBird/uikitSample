import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

export const Page1 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>You're current on Page 1</h1>
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              navigate('/page2');
            }}
          >
            Go to Page 2
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

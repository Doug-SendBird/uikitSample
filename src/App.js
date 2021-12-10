import { StylesProvider } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material';
import { Router } from './routes';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      main: '#742ddd',
    },
    secondary: {
      main: '#f5f3f0',
    },
    error: {
      main: '#C0485E',
    },
    success: {
      main: '#027D69',
    },
  },
  typography: {
    fontFamily: ['Avenir Next', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;

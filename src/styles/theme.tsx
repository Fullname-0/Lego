import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: '#fff',
      main: '#1f2137',
      dark: '#000'
    },
    secondary: {
      main: '#018dec',
      light: '#fb882b',
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: ['Kanit', 'Onest', 'sans-serif'].join(','),
    h1: {
      fontSize: '42px',
      fontFamily: 'Kanit',
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    h2: {
      fontSize: '30px',
      fontFamily: 'Kanit',
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    h3: {
      fontSize: '28px',
      fontFamily: 'Kanit',
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    h5: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      color: '#000',
      fontSize: '18px',
    },
    h6: {
      fontFamily: 'Kanit',
      fontWeight: 600,
      fontSize: '18px',
    },
    body1: {
      fontFamily: 'Onest',
      fontWeight: 700,
      fontSize: '16px',
    },
  },
});
export default theme;

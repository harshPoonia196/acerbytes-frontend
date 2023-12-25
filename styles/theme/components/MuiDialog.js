import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default {
  styleOverrides: {
    container: {
      backdropFilter: "blur(15px)",
    },
    paper: {
      [theme.breakpoints.down('sm')]: {
        margin: '16px'
      },
      [theme.breakpoints.up('sm')]: {
        margin: '32px'
      }
    }
  },
};

import React from 'react'
import "../../CSS/Utils.css"
 
import Projects from "./component/Projects";
import Navbar from '../Navbar';
import MetaData from '../../MetaData';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#42b6EE',
      contrastText: '#fff',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
  // status: {
  //   danger: '#e53e3e',
  // },
  // palette: {
  //   primary: {
  //     main: '#0971f1',
  //     darker: '#053e85',
  //   },
  //   neutral: {
  //     main: '#64748B',
  //   },
  // },
});

const Project = () => {
  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Projects" />
      <Navbar />
      <Projects />
    </ThemeProvider>
  )
}

export default Project
import React from 'react'
import ClientNavbar from "../../ClientNavbar"
import "../../../CSS/Utils.css"
 
import Projects from "./component/Projects";
import MetaData from '../../../MetaData';
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
    
  }
});


const ClientProject = () => {
  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Projects" />
      <ClientNavbar />
      <Projects />
    </ThemeProvider>
  )
}

export default ClientProject
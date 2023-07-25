import React from 'react'
import Navbar from '../Navbar'
import MetaData from '../../MetaData'
import FundingForm from './component/FundingForm'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

const index = () => {
    
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
 })
  return (
    <ThemeProvider theme={theme}>

    <Navbar />
    <MetaData title="Projects" />
    <FundingForm />

    </ThemeProvider>
  )
}

export default index
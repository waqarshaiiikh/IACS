import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import MetaData from '../../MetaData'
import FundingForm from './component/FundingForm'
import FundingTrack from './component/FundingTrack';
import { Typography, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import useFetchData from '../../Hook/useFetchData';

const Index = () => {
    
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


    const { 
      loading: fundingProposalLoading, 
      error: fundingProposalError, 
      data: fundingProposalData, 
      fetchData: getFundingProposal } = useFetchData();

      useEffect(()=>{
        getFundingProposal(`/funding/student?id=${localStorage.getItem('userId')}`)
      },[])



  return (
    <ThemeProvider theme={theme}>

    <Navbar />
    <MetaData title="Projects" />
    {/* {fundingProposalError && fundingProposalError != null && <Typography>Server Busy</Typography>} */}
    {!fundingProposalData &&
     <FundingForm 
          fundingProposalLoading={fundingProposalLoading}
          getFundingProposal={getFundingProposal}
      />}
    {fundingProposalData &&
       <FundingTrack 
          data={fundingProposalData}
          
          />}

    </ThemeProvider>
  )
}

export default Index
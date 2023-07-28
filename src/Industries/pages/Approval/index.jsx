import React, { useEffect } from 'react'
import Approval from './component/Approval'
import { ThemeProvider, createTheme } from '@mui/material';
import MetaData from '../../../MetaData';
import RequestSubmitted from './component/RequestSubmited';
import useFetchData from '../../../Hook/useFetchData';
import { useParams, useSearchParams } from 'react-router-dom';
import NotFound from '../../../Pages/NotFound';
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
        }
      });


      const [hashId] = useSearchParams();

      
      const { 
        loading: fundingProposalLoading, 
        error: fundingProposalError, 
        data: fundingProposalData, 
        fetchData: getFundingProposal } = useFetchData();
        
        useEffect(()=>{
          getFundingProposal("/funding/hash?fundingHash="+hashId.get('funding')).then(res=>{
            console.log(res);
          });
        },[])
      
  return (
    <ThemeProvider theme={theme}>
        <MetaData title="Funding Approval"/>
        {!fundingProposalData && <NotFound/>}
        {fundingProposalData && fundingProposalData.status ==='sent' &&
                     <Approval 
                          data={fundingProposalData}
                          getFundingProposal={getFundingProposal}
                          fundingProposalLoading={fundingProposalLoading}
                          fundingProposalError={fundingProposalError}
                          />}
        {fundingProposalData && fundingProposalData.status !=='sent' && 
                    <RequestSubmitted 
                          studentName={fundingProposalData.studentName}
                          status={fundingProposalData.status}
                          />}
    </ThemeProvider>
  )
}

export default Index
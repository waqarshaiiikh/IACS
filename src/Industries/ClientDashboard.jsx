import { Box } from '@mui/material';
import React from 'react';
import ClientCard from "./ClientCard";
import ClientNavbar from './ClientNavbar';
import MetaData from "../MetaData";

const ClientDashboard = () => {
    return (
        <>
            <MetaData title="Client Dashboard"/>
            <ClientNavbar />
            <Box sx={{height:'90vh', boxSizing:'border-box',display:'flex', justifyContent:'center', alignItems:{lg:'center',xs:'none'},padding:'15px'}}>
                <ClientCard />
            </Box>
        </>
    )
}

export default ClientDashboard

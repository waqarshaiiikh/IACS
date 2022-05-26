import { Box } from '@mui/material'
import React from 'react'
import ClientCard from "./ClientCard"
import ClientNavbar from './ClientNavbar'
const ClientDashboard = () => {
    return (
        <>
            <ClientNavbar />
            <Box sx={{height:'90vh', boxSizing:'border-box',display:'flex', justifyContent:'center', alignItems:{lg:'center',xs:'none'},padding:'15px'}}>
                <ClientCard />
            </Box>
        </>
    )
}

export default ClientDashboard

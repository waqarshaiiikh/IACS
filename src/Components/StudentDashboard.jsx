import { Box } from '@mui/material'
import React from 'react'
import MetaData from '../MetaData'
import Navbar from './Navbar'
import StudentCard from "./StudentCard"

const StudentDashboard = () => {
    return (
        <>
            <MetaData title="Student Dashboard" />
            <Navbar />
            <Box sx={{ height: '90vh', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: { lg: 'center', xs: 'none' }, padding: '15px' }}>
                <StudentCard />
            </Box>
        </>
    )
}

export default StudentDashboard

import React from 'react';
import Navbar from './Navbar';
import "../CSS/Utils.css"
import MetaData from '../MetaData';
const StudentTraining = () => {
    return (
        <>
            <MetaData title="Trainings" />
            <Navbar />
            <div className='center_utils'>
                <h1 className='main_heading'>Training Coming Soon</h1>
            </div>
        </>
    )
}

export default StudentTraining

import React from 'react';
import Navbar from './Navbar';
import "../CSS/Utils.css";
import MetaData from '../MetaData';

const StudentProject = () => {
    return (
        <>
            <MetaData title="Projects"/>
            <Navbar />
            <div className='center_utils'>
                <h1 className='main_heading'>Projects Coming Soon</h1>
            </div>
        </>
    )
}

export default StudentProject

import React from 'react';
import ClientNavbar from './ClientNavbar';
import "../CSS/Utils.css";
import MetaData from "../MetaData";

const ClientScholarship = () => {
  return (
    <>
      <MetaData title="Scholarships" />
      <ClientNavbar />
      <div className='center_utils'>
        <h1 className='main_heading'>Scholarship Comming Soon</h1>
      </div>
    </>
  )
}

export default ClientScholarship
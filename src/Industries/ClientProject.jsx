import React from 'react'
import ClientNavbar from "./ClientNavbar"
import "../CSS/Utils.css"
import MetaData from "../MetaData";

const ClientProject = () => {
    return (
        <>
            <MetaData title="Projects" />
            <ClientNavbar />
            <div className='center_utils'>
                <h1 className='main_heading'>Projects Comming Soon</h1>
            </div>
        </>
    )
}

export default ClientProject
import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import StudentDashboard from './StudentDashboard';
import StudentProfile from './StudentProfile';
import Introduction from './Introduction';
import SoftwareHouse from './SoftwareHouse';
import StudentJob  from './StudentJob';
import StudentInternship from './StudentInternship';
import StudentTraining from './StudentTraining';
import StudentProject from './StudentProject';
import StudentScholarship from './StudentScholarship';
import Signin from '../Pages/SignIn';
import Signup from '../Pages/SignUp';
import ClientProfile from "../Industries/ClientProfile"
import ClientDashborad from "../Industries/ClientDashboard"
import ClientStudent from '../Industries/ClientStudent';
import ClientJob from "../Industries/ClientJob"
import ClientInternship from '../Industries/ClientInternship';
import ClientProject from '../Industries/pages/project';
import Approval from '../Industries/pages/Approval';
import ClientScholarship from '../Industries/ClientScholarship';
import Admin from '../Admin/Admin';
import AdminStudents from "../Admin/AdminStudents"
import AdminSoftwareHouses from "../Admin/AdminSoftwareHouses";
import AdminJobs from "../Admin/AdminJobs";
import AdminInternships from "../Admin/AdminInternships";
import AdminMessage from "../Admin/AdminMessage";
import AdminRequest from "../Admin/AdminRequest";
import NotFound from "../Pages/NotFound.js";
import noteContext from '../context/notes/noteContext';
import Project from './project';
import AdminFunding from "../Admin/AdminFunding"

import Funding from "./Funding"; 
import AdminFundingDetailStyled from '../Admin/AdminFundingDetail';



// NotFound
const Main = () => {
    const a = useContext(noteContext)
    const user = a.UserType;
    const signin = a.Signin;

    return (
        <>
            <Routes>
                <Route path="/"                              element={<Introduction/>}/>
                <Route path="/signin"                        element={<Signin/> } />
                <Route path="/signup"                        element={<Signup />}/>
    
                <Route path='/admin/Home'                    element={ signin ?  user==="admin"     ?    <Admin/>                     :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Students'                element={ signin ?  user==="admin"     ?    <AdminStudents/>             :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Companies'          element={ signin ?  user==="admin"     ?    <AdminSoftwareHouses/>       :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Jobs'                    element={ signin ?  user==="admin"     ?    <AdminJobs/>                 :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Internships'             element={ signin ?  user==="admin"     ?    <AdminInternships/>          :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Request'                 element={ signin ?  user==="admin"     ?    <AdminRequest/>              :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Messages'                element={ signin ?  user==="admin"     ?    <AdminMessage/>              :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Funding'                 element={ signin ?  user==="admin"     ?    <AdminFunding/>              :<NotFound/>: <Signin/>  }/> 
                <Route path='/admin/Funding/:hashId'         element={ signin ?  user==="admin"     ?    <AdminFundingDetailStyled/>  :<NotFound/>: <Signin/>  }/> 

                <Route path='/clidashboard'                  element={ signin ?  user==="industry"  ?    <ClientDashborad/>     :<NotFound/>: <Signin/>  }/> 
                <Route path="/clientProfile"                 element={ signin ?  user==="industry"  ?    <ClientProfile/>       :<NotFound/>: <Signin/>  }/> 
                <Route path="/clistudent"                    element={ signin ?  user==="industry"  ?    <ClientStudent/>       :<NotFound/>: <Signin/>  }/> 
                <Route path="/clijob"                        element={ signin ?  user==="industry"  ?    <ClientJob/>           :<NotFound/>: <Signin/>  }/> 
                <Route path="/cliinternship"                 element={ signin ?  user==="industry"  ?    <ClientInternship/>    :<NotFound/>: <Signin/>  }/> 
                <Route path="/clischolarship"                element={ signin ?  user==="industry"  ?    <ClientScholarship/>   :<NotFound/>: <Signin/>  }/> 
                <Route path="/industry/project"              element={ signin ?  user==="industry"  ?    <ClientProject/>       :<NotFound/>: <Signin/>  }/> 
                <Route path="/funding-approval"              element={ <Approval/> }/> 

                <Route path="/stddashboard"                  element={ signin ?  user==="student"   ?    <StudentDashboard/>    :<NotFound/>: <Signin/>  }/> 
                <Route path="/studentProfile"                element={ signin ?  user==="student"   ?    <StudentProfile/>      :<NotFound/>: <Signin/>  }/> 
                <Route path="/stdjob"                        element={ signin ?  user==="student"   ?    <StudentJob/>          :<NotFound/>: <Signin/>  }/> 
                <Route path="/stdinternship"                 element={ signin ?  user==="student"   ?    <StudentInternship/>   :<NotFound/>: <Signin/>  }/> 
                <Route path="/stdtraining"                   element={ signin ?  user==="student"   ?    <StudentTraining/>     :<NotFound/>: <Signin/>  }/> 
                <Route path="/stdproject"                    element={ signin ?  user==="student"   ?    <Project/>             :<NotFound/>: <Signin/>  }/> 
                <Route path='/student/funding'               element={ signin ?  user==="student"   ?    <Funding/>             :<NotFound/>: <Signin/>  }/>
                <Route path="/companies"                     element={ signin ?  user==="student"   ?    <SoftwareHouse/>       :<NotFound/>: <Signin/>  }/> 
                <Route path="*"                              element={<NotFound/>}/> 
            </Routes>
        </>
    )
}

export default Main

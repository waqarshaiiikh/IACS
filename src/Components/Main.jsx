import React from 'react'
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
import ClientProject from '../Industries/ClientProject';
import ClientScholarship from '../Industries/ClientScholarship';

const Main = () => {
    let student = "industry";
    return (
        <>
            <Routes>
                {student==="industry" && <Route path="//*" element={<Introduction />} />}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/clidashboard' element={<ClientDashborad />}/>
                <Route path="/clientProfile" element={<ClientProfile/>}/>
                <Route path="/clistudent" element={<ClientStudent />} />
                <Route path="/clijob" element={<ClientJob />} />
                <Route path="/cliinternship" element={<ClientInternship />} />
                <Route path="/cliproject" element={<ClientProject />} />
                <Route path="/clischolarship" element={<ClientScholarship />} />
                <Route path="/stddashboard" element={<StudentDashboard />}/>
                <Route path="/studentProfile" element={<StudentProfile/>}/>
                <Route path="/stdjob" element={<StudentJob/> }/>
                <Route path="/softwarehouse" element={<SoftwareHouse />} />
                <Route path="/stdinternship" element={<StudentInternship/>}/>
                <Route path="/stdtraining" element={<StudentTraining/>}/>
                <Route path="/stdproject" element={<StudentProject/>}/>
                <Route path="/stdscholarship" element={<StudentScholarship/>}/>
                <Route path="/softwarehouse" element={<SoftwareHouse/>}/>
            </Routes>
        </>
    )
}

export default Main

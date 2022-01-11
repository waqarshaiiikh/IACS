import React from 'react'
import { Routes, Route } from "react-router-dom";
import Card from './Card';
import Dashboard from './Dashboard';
import Password from './Password';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import Request from './Request';
import Introduction from './Introduction';
import SoftwareHouse from './SoftwareHouse';
import Student from './Student';
import Job from './Job';
import Internship from './Internship';
import Project from './Project';
import Scholarship from './Scholarship';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
const Main = () => {
    return (
        <>
            <Routes>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/" element={<Introduction />} />
                <Route path="/softwarehouse" element={<SoftwareHouse/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/job" element={<Job/>}/>
                <Route path="/internship" element={<Internship/>}/>
                <Route path="/project" element={<Project/>}/>
                <Route path="/scholarship" element={<Scholarship/>}/>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard/home" element={<Card />} />
                    <Route path="/dashboard/profile" element={<Profile />} />
                    <Route path="/dashboard/password" element={<Password />} />
                    <Route path="/dashboard/request" element={<Request />} />
                    <Route path="/dashboard/update" element={<ProfileForm />} />
                </Route>
            </Routes>
        </>
    )
}

export default Main

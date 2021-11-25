import React, {useRef} from 'react'
import office from "../Images/office.png"
import student from "../Images/student.png"
import job from "../Images/job.png"
import project from "../Images/idea.png"
import scholarship from "../Images/scholarship.png"
import internship from "../Images/internship.png"

const Dashboard = () => {

        // const menuToggle = document.querySelector('.toggle');
        const menuToggle = useRef()
        const navigation = useRef()
        const dashboard = useRef()
        // const navigation = document.querySelector('.navigation');
        // const dashboard = document.querySelector('.dashboard');
        const menu= ()=> {
            menuToggle.current.classList.toggle('active')
            navigation.current.classList.toggle('active')
            dashboard.current.classList.toggle('active')
        }

        let list = document.querySelectorAll('.list')
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            list[i].onclick = function () {
                let j = 0;
                while (j < list.length) {
                    list[j++].className = 'list';
                }
                list[i].className = 'list active';
            }
        }

    return (
        <>
        <div className="navigation" ref={navigation}>
        <ul>
            <li className="list active">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span className="title">Home</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="person-outline"></ion-icon>
                    </span>
                    <span className="title">Profile</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </span>
                    <span className="title">Message</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="settings-outline"></ion-icon>
                    </span>
                    <span className="title">Setting</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="help-outline"></ion-icon>
                    </span>
                    <span className="title">Help</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                    <span className="title">Password</span>
                </a>
            </li>
            <li className="list">
                <b></b>
                <b></b>
                <a href="#">
                    <span className="icon">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="title">Sign Out</span>
                </a>
            </li>
        </ul>
    </div>
    {/* <div className="toggle">
        <ion-icon name="menu-outline" className="open"></ion-icon>
        <ion-icon name="close-outline" className="close"></ion-icon>
    </div> */}
    <div className="dashboard" ref={dashboard}>
        <div className="dashboard-header">
            <div className="toggle" ref={menuToggle} onClick={menu}>
                <ion-icon name="menu-outline" className="open"></ion-icon>
                <ion-icon name="close-outline" className="close"></ion-icon>
            </div>
            <div className="search">
                <input type="text" name="" id=""/>
                <span className="search-icon">
                    <ion-icon name="search-outline"></ion-icon>
                </span> 
            </div>
            <div className="profile">
                <ion-icon name="person-outline"></ion-icon>
                <label htmlFor="">Muhammad Khalid</label>
            </div>
        </div>
        <div className="dashboard-content">
            <div className="row">
                <div className="card">
                    <img src={office} alt=""/>
                    <label htmlFor="">Software House</label>
                </div>
                <div className="card">
                    <img src={student} alt=""/>
                    <label htmlFor="">Students</label>
                </div>
                <div className="card">
                    <img src={student} alt=""/>
                    <label htmlhtmlFor="">Jobs</label>
                </div>
            </div>
            <div className="row">
                <div className="card">
                    <img src={internship} alt=""/>
                    <label htmlFor="">Intership</label>
                </div>
                <div className="card">
                    <img src={project} alt=""/>
                    <label htmlFor="">Projects</label>
                </div>
                <div className="card">
                    <img src={scholarship} alt=""/>
                    <label htmlFor="">Scholarship</label>
                </div>
            </div>
            <div className="row"></div>
        </div>
    </div>
    </>
    )
}

export default Dashboard

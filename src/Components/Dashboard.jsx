import React, { useRef,useEffect} from 'react'
import { Link, Outlet } from "react-router-dom"
const Dashboard = (props) => {
    // const [Dashboard, setDashboard] = useState(true)
    const menuToggle = useRef()
    const navigation = useRef()
    const dashboard = useRef()
    useEffect(() => {
        let list = document.querySelectorAll('.list')
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function (event) {
                let j = 0;
                while (j < list.length) {
                    list[j++].className = 'list';
                }
                list[i].className = 'list active';
                console.log("hello")
            })
        }
    })
    const menu = () => {
        menuToggle.current.classList.toggle('active')
        navigation.current.classList.toggle('active')
        dashboard.current.classList.toggle('active')
        console.log(menuToggle.current);
    }
    return (
        <>
            <div className="navigation" ref={navigation}>
                <ul>
                    <li className="list active">
                        <b></b>
                        <b></b>
                        <Link to="/dashboard/home">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Home</span>
                        </Link>
                    </li>
                    <li className="list">
                        <b></b>
                        <b></b>
                        <Link to="/dashboard/profile">
                            <span className="icon">
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className="title">Profile</span>
                        </Link>
                    </li>
                    <li className="list">
                        <b></b>
                        <b></b>
                        <Link to="/dashboard/request">
                            <span className="icon">
                                <ion-icon name="chatbubbles-outline"></ion-icon>
                            </span>
                            <span className="title">Message</span>
                        </Link>
                    </li>
                    <li className="list">
                        <b></b>
                        <b></b>
                        <Link to="/dashboard/update">
                            <span className="icon">
                                <ion-icon name="refresh-outline"></ion-icon>
                            </span>
                            <span className="title">Update Profile</span>
                        </Link>
                    </li>
                    <li className="list">
                        <b></b>
                        <b></b>
                        <Link to="/dashboard/password">
                            <span className="icon">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span>
                            <span className="title">Password</span>
                        </Link>
                    </li>
                    <li className="list">
                        <b></b>
                        <b></b>
                        <Link to="/">
                            <span className="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span className="title">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="dashboard" ref={dashboard}>
                <div className="dashboard-header">
                    <div className="toggle" ref={menuToggle} onClick={menu}>
                        <ion-icon name="menu-outline" className="open"></ion-icon>
                        {/* <ion-icon name="close-outline" className="close"></ion-icon> */}
                    </div>
                    <div className="search">
                        <input type="text" name="" id="" />
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
                    {props && props.field}
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard

import React from 'react'
import std from "../Images/mypic.jpg"
import "../CSS/Profile.css"

const Profile = () => {
    return (
       <>
       <div className="profile-info">
            <div className="profile-picture">
                <div className="picture">
                <img src={std} alt="" />
                <span>Muhammad Khalid</span>
                </div>
                <div className="education">
                    <p>NED University of Engineering & Technology</p>
                    <p>Third Year Software Engineering</p>
                </div> 
            </div>
            <div className="profile-about">
                <div className="about-box">
                    <span>Skills</span>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam animi sequi quibusdam corporis impedit natus magni, adipisci libero odio voluptas unde enim autem hic deleniti ratione. Nisi voluptatibus voluptates est?</p>
                </div>
                <div className="about-box">
                    <span>About</span>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam animi sequi quibusdam corporis impedit natus magni, adipisci libero odio voluptas unde enim autem hic deleniti ratione. Nisi voluptatibus voluptates est?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur cupiditate, magnam nisi et neque sed earum eum consectetur corrupti iste dolorem. Et dolorum modi est quaerat aspernatur veniam, voluptatibus dolore, qui cumque architecto repudiandae autem, tenetur accusamus iusto id ut distinctio unde hic assumenda rerum eveniet recusandae vel! Magni, 
                    a!</p>
                </div>
            </div>
       </div>
       </>
    )
}

export default Profile

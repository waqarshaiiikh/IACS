import React from 'react'
import about from "../Images/about.svg"
const About = () => {
    return (
        <>
            <section id="about">
                <div className="one about-description">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolorem numquam ipsum ut adipisci
                        perspiciatis doloremque sequi voluptate tempore inventore ipsam, odio fugiat, et officiis mollitia ea
                        veniam asperiores consequatur.sit, amet consectetur adipisicing elit. Neque dolorem numquam ipsum ut adipisci
                        perspiciatis doloremque sequi voluptate tempore inventore ipsam, odio fugiat, et officiis mollitia ea
                        veniam asperiores consequatur</p>
                </div>
                <div className="two about-image">
                    <img src={about} alt="about"/>
                </div>
            </section>
        </>
    )
}

export default About

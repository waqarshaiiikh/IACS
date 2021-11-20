import React from 'react'
import interview from "../Images/interview.svg"
const Home = () => {
    return (
        <>
            <section id="home">
                <div className="one home-description">
                    <p>Welcome To IACS</p>
                    <h1>Industrial Academia Coordination System</h1>
                    <p>Grow Your Profession with Us</p>
                    <label for="started">Get Started</label>
                </div>
                <div className="two home-image">
                    <img src={interview} alt="home" />
                </div>
            </section>
        </>
    )
}

export default Home

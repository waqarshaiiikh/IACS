import React from 'react'
import contact from "../Images/contact.svg"

const Contact = () => {
    return (
        <>
            <section id="contact">
                <div className="one contact-image">
                    <img src={contact} alt="" />
                </div>
                <div className="two contact-description">
                    <div className="contact-info">
                        <label htmlFor="fullname" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            placeholder="Enter Your Full Name"
                        />
                    </div>
                    <div className="contact-info">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className="contact-info">
                        <label htmlFor="message" className="form-label">
                            Message
                        </label>
                        <textarea
                            className="form-control"
                            id="message"
                            rows="5"
                        ></textarea>
                        <div className="submit">Submit</div>
                    </div>
                </div>
            </section>
            <footer>
                <p>Industrial Academia Coordination System IACS © Copyright 2021 </p>
            </footer>
        </>
    )
}

export default Contact

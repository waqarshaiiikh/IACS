import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Sign Up</h1>
                <div className="signin-info">
                    <label htmlFor="fullname" className="form-label">
                        Id
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Enter Your Id"
                    />
                </div>
                <div className="signin-info">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Password"
                    />
                </div>
                <div className="submit">
                    <Link to="/">
                        Submit
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SignUp

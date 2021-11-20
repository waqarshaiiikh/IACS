import React from 'react'

const SignIn = () => {
    return (
        <>
            <div className="signIn-form">
                <h1>Sign In</h1>
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
                <div className="submit">Submit</div>
            </div>
        </>
    )
}

export default SignIn

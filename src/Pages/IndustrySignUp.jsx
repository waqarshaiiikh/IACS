import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import { FormControl, TextField, Button, Container, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import apiCAll from '../integration/apiCall';
const {apiCAll}= require('../integration/apiCall');
const validator = require("validator");


const useStyles = makeStyles({
    button: {
        background: '#42b6EE !important',
        border: '0 !important',
        borderRadius: '3 !important',
        color: 'white !important',
        height: 48,
        padding: '0 30px !important',
    }
});

const IndustrySignUp = () => {

    const classes = useStyles();
    const instruction = {
        email: {
            clause1: "  Organization Email only, otherwise rejected"
        },
        password: {
            clause1: "  Minimum length (8)",
            clause2: "  Must contain alphabatic (A-Z), numeric (1-9) & special characters (!@..) ",
            clause3: "  e.g: '#000abcd' ",
        },
        companyName: {
            // clause1: "  You can't leave this empty"
        },
        hrName: {
            clause1: "  HR. name should be Alphabetic"
        },
        phoneNumber: {
            clause1: "  Mobile No. must follow this pattern +923XXXXXXXXX "
        },
        cnic: {
            clause1: "  Don't use Dash '-' between digits ",
            clause2: "  Follow this pattern '42101XXXXXXXX' ",
        },
        city: {
            clause1: "  city should be Alphabetic"
        },
        country: {
            clause1: "  country should be Alphabetic"
        },
        otp: "Sending OTP just wait 30s, otherwise go back and regenerate OTP"
    };



    const [pageNo, updatePageNo] = useState(0);
    let Pages = {
        page1: "sendOTP",
        page2: "verifyOTP",
        page3: "industryDataField",
        value: pageNo,

        curVal: function (n = this.value) {

            return this[Object.keys(this)[n]];
        },
        nextVal: function (n = this.value) {
            try {
                updatePageNo(pageNo + 1);
                return this[Object.keys(this)[n + 1]]
            }
            catch {
                return this[Object.keys(this)[n]]
            }
        },
        preVal: function (n = this.value) {
            try {
                updatePageNo(pageNo - 1);
                return this[Object.keys(this)[n - 1]]

            }
            catch {
                return this[Object.keys(this)[n]]
            }
        }
    };
    const [subPage, updatePage] = useState(Pages.curVal());


    const navigate = useNavigate();
    const clientName = "industry";
    const companyName = useFormInput('');
    const hrName = useFormInput('');
    const email = useFormInput('');
    const phoneNumber = useFormInput('');
    const cnic = useFormInput('');
    const city = useFormInput('');
    const country = useFormInput('Pakistan');
    const password = useFormInput('');
    const cpassword = useFormInput('');
    const otpField = useFormInput('');
    const [token, updateToken] = useState('');

    const [loading, setLoading] = useState({
        sendOTP: false,
        verifyOTP: false,
        industryDataField: false
    });
    const [error, setError] = useState(
        {
            sendOTP: null,
            verifyOTP: null,
            industryDataField: null
        });


    const sendOTP = _ => {

        const getOTP = () => {
            setError({ sendOTP: null });
            setLoading({ sendOTP: true });

            const reqData = {
                email: email.value,
                password: password.value,
                clientName,
            };

            const isError = DataValidation("sendOTP")

            if (!isError) {
                apiCAll("/api/otp/generate", "post", reqData)
                    .then(response => {
                        setLoading({ sendOTP: false });
                        updateToken(response.data.token);
                        updatePage(Pages.nextVal());
                    })
                    .catch(error => {
                        setLoading({ sendOTP: false });
                        try {
                            if (error.response.status >= 400 || error.response.status <= 499) {
                                console.log({ ...error.response });
                                setError({ sendOTP: "Invalid Data" });
                            }
                        }
                        catch {
                            setError({ sendOTP: "Something went wrong. Please try again later." })
                        }
                    });
            } else {

                setLoading({ sendOTP: false });
                setError({ sendOTP: ((isError.email || "") + (isError.password || "")).replaceAll('<br/>', '\n') });
            }
        }


        return (
            <>
                <Box
                    sx={{
                        width: { lg: "700px", xs: '300px' }, height:'auto',
                        background: '#F6F6F6', padding: '15px',
                        display: 'flex', justifyContent: 'center',
                        borderRadius: '10px',
                        'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    }}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                            <TextField id="email" fullWidth label="Email" placeholder='abc@cloud.neduet.edu.pk' {...email} type="email" variant="outlined" required />
                            <pre >{instruction.email.clause1}</pre>
                        </Grid>

                        <Grid item lg={12} xs={12}>
                            <TextField id="password" fullWidth label="Password" type='password' {...password} variant="outlined" required />
                            <pre>{instruction.password.clause1} <br />{instruction.password.clause2} <br />{instruction.password.clause3}</pre>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <TextField id="cpassword" fullWidth label="Confirm Password" type='password' {...cpassword} variant="outlined" required />
                        </Grid>

                        <Grid item lg={12} xs={12} display='flex' justifyContent='right' >
                            <Button className={classes.button} disabled={loading.sendOTP} onClick={getOTP} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                                {loading.sendOTP ? "sending..." : "Generate OTP"}
                            </Button>
                        </Grid>
                        {
                            error.sendOTP &&
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <> <pre style={{ color: 'red' }}>{error.sendOTP}</pre> </>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </>
        )
    }


    const verifyOTP = _ => {


        const verifyOTP = _ => {
            setError({ verifyOTP: null });
            setLoading({ verifyOTP: true });

            const reqData = {
                email: email.value,
                password: password.value,
                OTP: otpField.value,
                clientName,
                token,
            };

            apiCAll("/api/otp/verify", "post", reqData)
                .then(() => {
                    setLoading({ verifyOTP: false });
                    updatePage(Pages.nextVal());
                }
                )
                .catch(error => {
                    setLoading(false);
                    try {
                        if (error.response.status >= 400 || error.response.status <= 499) {
                            console.log({ ...error.response });
                            setError({ verifyOTP: "Invalid OTP" });
                        }
                    }
                    catch {
                        setError({ verifyOTP: "Something went wrong. Please try again later." })
                    }
                });
        }

        return (
            <>
                <Grid container spacing={3}>
                    <Grid item lg={12} xs={12}>
                        {
                            error.verifyOTP &&
                            <> <small style={{ color: 'red' }}>{error.verifyOTP}</small> </>
                        }
                        <TextField id="otp" fullWidth placeholder='Enter 6 digit OTP' label="OTP" {...otpField} type='text' variant="outlined" required />
                        <pre >{instruction.otp.clause1}</pre>

                    </Grid>
                    <Grid item lg={12} xs={12} display='flex' justifyContent='left' >

                        <Button className={classes.button} onClick={() => { updatePage(Pages.preVal()); }} disabled={loading.verifyOTP} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                            Back
                        </Button>

                        <Button className={classes.button} onClick={verifyOTP} disabled={loading.verifyOTP} outline="none" sx={{ background: '42b6EE' }}>
                            {loading.verifyOTP ? "verifying..." : "Next"}
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }



    const industryDataField = _ => {

        // handle button click of login form
        const handleLogin = async () => {
            setError({ industryDataField: null });
            setLoading({ industryDataField: true });

            const reqData = {
                token,
                OTP: otpField.value,
                email: email.value,
                companyName: companyName.value,
                hrName: hrName.value,
                phoneNumber: phoneNumber.value,
                cnic: cnic.value,
                city: city.value,
                country: country.value,
                password: password.value,
                clientName,
            };


            const isError = DataValidation("industryDataField");

            if (!isError) {
                apiCAll(`/api/signup`, 'post', reqData)
                    .then(response => {
                        setLoading({ industryDataField: false });
                        navigate('/');
                    })
                    .catch(error => {
                        setLoading(false);
                        try {
                            if (error.response.status >= 400 || error.response.status <= 499) {
                                console.log({ ...error.response });
                                setError({ industryDataField: "Invalid Data" });
                            }
                        }
                        catch {
                            setError({ industryDataField: "Something went wrong. Please try again later." })
                        }
                    });
            }
            else {

                setLoading({ industryDataField: false });
                const ErrorData = ((isError.companyName || "") + (isError.hrName || "") +
                    (isError.phoneNumber || "") + (isError.cnic || "") + (isError.city || "") + (isError.country || ""));
                setError({ industryDataField: ErrorData.replaceAll('<br/>', '*\n') });
            }

        }

        return (
            <>
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={12}>
                        <TextField id="cname" fullWidth label="Company Name" {...companyName} type="text" variant="outlined" required />
                        <pre>{instruction.companyName.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="hrname" fullWidth label="HR Name" {...hrName} type='text' variant="outlined" required />
                        <pre>{instruction.hrName.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="phoneNumber" fullWidth label="Phone No" {...phoneNumber} type='tel' variant="outlined" required />
                        <pre>{instruction.phoneNumber.clause1}<br />{instruction.phoneNumber.clause2}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="cnic" fullWidth label="CNIC / NTN" {...cnic} type='number' variant="outlined" required />
                        <pre>{instruction.cnic.clause1}<br />{instruction.cnic.clause2}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="city" fullWidth label="City" {...city} type='text' variant="outlined" required />
                        <pre>{instruction.city.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="country" fullWidth label="Country" {...country} type='text' variant="outlined" required />
                        <pre>{instruction.country.clause1}</pre>
                    </Grid>
                    {
                        error.industryDataField &&
                        <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <> <pre style={{ color: 'red' }}>{error.industryDataField}</pre> </>
                        </Grid>
                    }
                    <Grid item lg={6} xs={12} display='flex' justifyContent='right' >

                        <Button className={classes.button} onClick={() => updatePage(Pages.preVal())} disabled={loading.industryDataField} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                            Back
                        </Button>

                        <Button className={classes.button} onClick={handleLogin} disabled={loading.industryDataField} outline="none" sx={{ background: '42b6EE' }}>
                            {
                                loading.industryDataField ? "uploading..." : "Sign Up"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }



    const DataValidation = (page) => {
        let Error = null;
        try {
            if (page === "sendOTP") {
                if (validator.isEmail(email.value) === false) {
                    Error = { ...Error, email: "Invalid Email, Please follow instruction <br/>" }
                }
                if (validator.isStrongPassword(
                    password.value, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 1, returnScore: false }) === false) {
                    Error = { ...Error, password: "Invalid Password, Please follow instruction <br/>" }
                }
                if (validator.equals(password.value, cpassword.value) === false) {
                    Error = { ...Error, password: "Password doesn't Match <br/>" }
                }
                return Error;
            }
            else if (page === "industryDataField") {
                if (validator.isEmpty(companyName.value) === true) {
                    Error = { ...Error, companyName: "Company name require <br/>" }
                }
                if (validator.isAlpha(hrName.value,['en-US'], {ignore: '/[\s|\-|_]/g'}
                ) === false) {
                    Error = { ...Error, hrName: "Invalid HR. Name <br/>" }
                }
                if (validator.isMobilePhone(phoneNumber.value, ['en-PK'], { strictMode: true }) === false) {
                    Error = { ...Error, phoneNumber: "Invalid Mobile Number, Please follow instruction <br/>" }
                }
                if ((validator.isNumeric(cnic.value, { no_symbols: true })
                    && (validator.isLength(cnic.value, { min: 13, max: 13 }) || validator.isLength(cnic.value, { min: 7, max: 7 }))) === false) {
                    Error = { ...Error, cnic: "Invalid CNIC/NIC <br/>" }
                }
                if (validator.isAlpha(city.value,['en-US'], {ignore: '/[\s|\-|_]/g'}) === false) {
                    Error = { ...Error, city: "Invalid City Name <br/>" }
                }
                if (validator.isAlpha(country.value,['en-US'], {ignore: '/[\s|\-|_]/g'}) === false) {
                    Error = { ...Error, country: "Invalid Country <br/>" }
                }
                return Error;
            }
        }
        catch {
            Error = { email: "Invalid Data" }
            return Error;
        }
    }

    return (
        <>
            <Container sx={{display:'flex', justifyContent:'left'}}>
                <FormControl>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h4'>
                                Industry SignUp
                            </Typography>
                        </Grid>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                            {subPage === "sendOTP" && sendOTP()}
                        </Grid>
                        {subPage === "verifyOTP" && verifyOTP()}
                        {subPage === "industryDataField" && industryDataField()}
                    </Grid>
                </FormControl>
            </Container>
        </>
    )
}


const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}


export default IndustrySignUp

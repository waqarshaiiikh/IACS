import React, { useState , useContext} from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';
import { MenuItem, FormControl, TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
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


const StudentSignUp = () => {
    // const department    = useFormInput('SE');
    // const CGPA          = useFormInput('2.76');
    // const semester      = useFormInput('1');
    // const year          = useFormInput('1');
    
    const a = useContext(noteContext);
    const gettingData = a.gettingData;

    const classes = useStyles();
    const instruction = {
        email: {
            clause1: "  Only cloud Email are allowed"
        },
        password: {
            clause1: "  Minimum length (8)",
            clause2: "  Must contain alphabatic (A-Z), numeric (1-9) & special characters (!@..) ",
            clause3: "  e.g: '#000abcd' ",
        },
        fname: {
            clause1: "  First Name should be Alphabetic"
        },
        lname: {
            clause1: "  Last Name should be Alphabetic"
        },
        enrollment: {
            clause1: "  Please follow this pattern 'NED/XXXX/XXXX' "
        },
        phoneNumber: {
            clause1: "  Must follow this pattern +923XXXXXXXXX "
        },
        university: {
            clause1: "  University name should be Alphabetic"
        },
        otp: {
            clause1: "  Sending OTP just wait 30s, otherwise go back and regenerate OTP"
        },
        cgpa: {
            clause1: "  In Between 1 to 4"
        }
    };

    const [pageNo, updatePageNo] = useState(0);
    let Pages = {
        page1: "sendOTP",
        page2: "verifyOTP",
        page3: "StudentsDataField",
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
    const clientName = "student";
    const fname = useFormInput('');
    const lname = useFormInput('');
    const email = useFormInput('');
    const phoneNumber = useFormInput('');
    const enrollment = useFormInput('NED/');
    const university = useFormInput('');
    const department = useFormInput('');
    const CGPA = useFormInput('');
    const semester = useFormInput('');
    const year = useFormInput('');
    const password = useFormInput('');
    const cpassword = useFormInput('');
    const otpField = useFormInput('');
    const [token, updateToken] = useState('');

    const [loading, setLoading] = useState({
        sendOTP: false,
        verifyOTP: false,
        StudentsDataField: false
    });
    const [error, setError] = useState({
        sendOTP: null,
        verifyOTP: null,
        StudentsDataField: null
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
                        console.log(response.data.token);
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
                        <Grid item lg={12} xs={12} >
                            <TextField id="email" fullWidth label="Email" placeholder='abc@cloud.neduet.edu.pk' {...email} type="email" variant="outlined" required />
                            <pre sx={{width:{ lg: "700px", xs: '200px' }}}>{instruction.email.clause1}</pre>
                        </Grid>
                    
                        <Grid item lg={12} xs={12}>
                            <TextField id="password" fullWidth label="Password" type='password' {...password} variant="outlined" required />
                            <pre sx={{display:'block',width:{ lg: "700px", xs: '200px' }}}>{instruction.password.clause1} <br />{instruction.password.clause2} <br />{instruction.password.clause3}</pre>
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
                    <Grid item lg={6} xs={12}>
                        {
                            error.verifyOTP &&
                            <> <small style={{ color: 'red' }}>{error.verifyOTP}</small> </>
                        }
                        <TextField id="otp" fullWidth placeholder='Enter 6 digit OTP' label="OTP" {...otpField} type='text' variant="outlined" required />
                        <pre >{instruction.otp.clause1}</pre>

                    </Grid>
                    <Grid item lg={6} xs={12} display='flex' justifyContent='right' >

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

    const StudentsDataField = _ => {

        // handle button click of login form
        const handleLogin = async () => {
            setError({ StudentsDataField: null });
            setLoading({ StudentsDataField: true });

            const reqData = {
                token,
                OTP: otpField.value,
                email: email.value,
                password: password.value,
                fname: fname.value,
                lname: lname.value,
                phoneNumber: phoneNumber.value,
                enrollment: enrollment.value,
                university: university.value,
                department: department.value,
                CGPA: CGPA.value,
                semester: semester.value,
                year: year.value,
                clientName,
            };

            const isError = DataValidation("StudentsDataField");

            if (!isError) {
                apiCAll(`/api/signup`, 'post', reqData)
                    .then(async response => {
                        await gettingData();
                        localStorage.setItem('Signin', JSON.stringify(true));
                        a.setSignin(true);
                        setLoading({ StudentsDataField: false });
                        navigate('/');
                    })
                    .catch(error => {
                        setLoading(false);
                        try {
                            if (error.response.status >= 400 || error.response.status <= 499) {
                                console.log({ ...error.response });
                                setError({ StudentsDataField: error.response.data });
                            }
                        }
                        catch {
                            setError({ StudentsDataField: "Something went wrong. Please try again later." })
                        }
                    });
            }
            else {

                setLoading({ StudentsDataField: false });
                const ErrorData = ((isError.fname || "") + (isError.lname || "") +
                    (isError.phoneNumber || "") + (isError.enrollment || "") +(isError.CGPA || "") 
                    + (isError.university || ""));
                setError({ StudentsDataField: ErrorData.replaceAll('<br/>', '*\n') });
            }
        }


        return (
            <>
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={12}>
                        <TextField id="fname" fullWidth label="First Name" {...fname} type="text" variant="outlined" required />
                        <pre>{instruction.fname.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="lname" fullWidth label="Last Name" {...lname} type="text" variant="outlined" required />
                        <pre>{instruction.lname.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="phoneNumber" fullWidth label="Phone No" {...phoneNumber} type='tel' variant="outlined" required />
                        <pre>{instruction.phoneNumber.clause1}<br/></pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="enrollnment" fullWidth label="Enrollnment No" {...enrollment} type='text' variant="outlined" required />
                        <pre>{instruction.enrollment.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="univeristy" fullWidth label="University" {...university} type='text' variant="outlined" required />
                        <pre>{instruction.university.clause1}</pre>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="department" fullWidth label="Department" {...department} type='text' variant="outlined" required select>
                            <MenuItem key="Software Engineering                  " value="SE"     > Software Engineering                  </MenuItem>
                            <MenuItem key="Computer Science                      " value="CT"     > Computer Science                      </MenuItem>
                            <MenuItem key="Computer Systems Engineering          " value="CS"     > Computer Systems Engineering          </MenuItem>
                            <MenuItem key="Computational Finance                 " value="CF"     > Computational Finance                 </MenuItem>
                            <MenuItem key="Telecommunications Engineering        " value="TC"     > Telecommunications Engineering        </MenuItem>
                            <MenuItem key="Economics & Finance                   " value="EC"     > Economics & Finance                   </MenuItem>
                            <MenuItem key="Electronic Engineering                " value="EL"     > Electronic Engineering                </MenuItem>
                            <MenuItem key="Civil Engineering                     " value="CE"     > Civil Engineering                     </MenuItem>
                            <MenuItem key="Petroleum Engineering                 " value="PE"     > Petroleum Engineering                 </MenuItem>
                            <MenuItem key="Mechanical Engineering                " value="ME"     > Mechanical Engineering                </MenuItem>
                            <MenuItem key="Textile Engineering                   " value="TE"     > Textile Engineering                   </MenuItem>
                            <MenuItem key="Industrial & Manufacturing Engineering" value="IM"     > Industrial & Manufacturing Engineering</MenuItem>
                            <MenuItem key="Automotive Engineering                " value="AU"     > Automotive Engineering                </MenuItem>
                            <MenuItem key="Electrical Engineering                " value="EE"     > Electrical Engineering                </MenuItem>
                            <MenuItem key="Materials Engineering                 " value="MM"     > Materials Engineering                 </MenuItem>
                            <MenuItem key="Chemical Engineering                  " value="CH"     > Chemical Engineering                  </MenuItem>
                            <MenuItem key="Metallurgical Engineering             " value="MY"     > Metallurgical Engineering             </MenuItem>
                            <MenuItem key="Polymer & Petrochemical Engineering   " value="PP"     > Polymer & Petrochemical Engineering   </MenuItem>
                            <MenuItem key="Biomedical Engineering                " value="BM"     > Biomedical Engineering                </MenuItem>
                            <MenuItem key="Food Engineering                      " value="FD"     > Food Engineering                      </MenuItem>
                            <MenuItem key="Architecture                          " value="B.Arch" > Architecture                          </MenuItem>
                            <MenuItem key="Textile Sciences                      " value="TS"     > Textile Sciences                      </MenuItem>
                            <MenuItem key="Development Studies                   " value="DS"     > Development Studies                   </MenuItem>
                            <MenuItem key="Management Sciences                   " value="MG"     > Management Sciences                   </MenuItem>
                            <MenuItem key="Industrial Chemistry                  " value="IC"     > Industrial Chemistry                  </MenuItem>
                            <MenuItem key="Applied Physics                       " value="AP"     > Applied Physics                       </MenuItem>
                            <MenuItem key="English Linguistics                   " value="EG"     > English Linguistics                   </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="year" fullWidth label="Year" {...year} variant="outlined" required select>
                            <MenuItem key="first" value="1">First</MenuItem>
                            <MenuItem key="second" value="2">Second</MenuItem>
                            <MenuItem key="third" value="3">Third</MenuItem>
                            <MenuItem key="final" value="4">Final</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="semester" fullWidth label="Semester" {...semester} variant="outlined" required select>
                            <MenuItem key="first" value="1">Fall / First</MenuItem>
                            <MenuItem key="second" value="2">Spring / Second</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                        <TextField id="gpa" fullWidth label="CGPA" type='number' {...CGPA} variant="outlined" required />
                    </Grid>


                    <Grid item lg={6} xs={12} display='flex' justifyContent='right' >

                        <Button className={classes.button} onClick={() => updatePage(Pages.preVal())} disabled={loading.StudentsDataField} outline="none" sx={{ background: '42b6EE', marginRight: '10px' }}>
                            Back
                        </Button>

                        <Button className={classes.button} onClick={handleLogin} disabled={loading.StudentsDataField} outline="none" sx={{ background: '42b6EE' }}>
                            {
                                loading.StudentsDataField ? "uploading..." : "Sign Up"
                            }
                        </Button>
                    </Grid>
                    {
                        error.StudentsDataField &&
                        <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <> <pre style={{ color: 'red' }}>{error.StudentsDataField}</pre> </>
                        </Grid>
                    }
                </Grid>
            </>
        )
    }


    const DataValidation = (page) => {
        let Error = null;
        try {
            if (page === "sendOTP") {
                if ((validator.isEmail(email.value) && validator.contains(email.value, '@cloud.neduet.edu.pk', { ignoreCase: false })) === false) {
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
            else if (page === "StudentsDataField") {

                if ((validator.isAlpha(fname.value ,['en-US'], {ignore: '/[\s|\-|_]/g'}) && validator.isLength(fname.value, { min: 3, max: 10 })) === false) {
                    Error = { ...Error, fname: "Invalid First Name <br/>" }
                }
                if ((validator.isAlpha(lname.value ,['en-US'], {ignore: '/[\s|\-|_]/g'}) && validator.isLength(lname.value, { min: 3, max: 10 })) === false) {
                    Error = { ...Error, lname: "Invalid Last Name <br/>" }
                }
                if (validator.isMobilePhone(phoneNumber.value, ['en-PK'], { strictMode: true }) === false) {
                    Error = { ...Error, phoneNumber: "Invalid Mobile Number, Please follow instruction <br/>" }
                }
                if ((validator.contains(enrollment.value, '/', { ignoreCase: false, minOccurrences: 2 })
                    && validator.contains(enrollment.value, 'NED/', { ignoreCase: true, minOccurrences: 1 })
                    && validator.isLength(enrollment.value, { min: 13, max: undefined })) === false) {
                    Error = { ...Error, enrollment: "Invalid Enrollnment No: <br/>" }
                }
                if ((validator.isAlpha(university.value,['en-US'], {ignore: '/[\s|\-|_]/g'}) || validator.isAlphanumeric(university.value,['en-US'], {ignore: '/[\s|\-|_]/g'})) === false) {
                    Error = { ...Error, university: "Invalid university Name <br/>" }
                }
                if ((validator.isFloat(CGPA.value, { min: '1.0', max: '4.0' })) === false) {
                    Error = { ...Error, CGPA: "Invalid CGPA <br/>" }
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
                                Student SignUp
                            </Typography>
                        </Grid>
                        <Grid item lg={12} xs={12} display='flex' justifyContent='center'>
                            {subPage === "sendOTP" && sendOTP()}
                        </Grid>
                        {subPage === "verifyOTP" && verifyOTP()}
                        {subPage === "StudentsDataField" && StudentsDataField()}
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

export default StudentSignUp



import React, { useState ,useContext} from 'react';
import { Box, Typography, Modal, Grid, Button, TextField, MenuItem , TextareaAutosize, FormControl, Checkbox, Tooltip } from '@mui/material/';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DatePicker, DateRangePicker, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import WorkIcon from '@mui/icons-material/Work';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import noteContext from '../context/notes/noteContext';



const { Api } = require('../integration/apiCall');
const Data = Api.getApi();

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const style = {
    position: 'absolute',
    top: { lg: '50%', xs: '80%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '1px solid #000',
    boxShadow: 24,
    p: { lg: 4, xs: 1 },
};

const skillStyle = {
    position: 'absolute',
    top: { lg: '50%', xs: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: '1px solid #000',
    boxShadow: 24,
    p: { lg: 4, xs: 1 },
}

function getSafe(fn, defaultVal="loading...") {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
}

function ProfileData(props) {

    const a = useContext(noteContext)

    const [ DOB          , setDOB]           = useState( a.DOB          );
    const [ phoneNumber  , set_phoneNumber ] = useState( a.phoneNumber  );
    const [ enrollment   , set_enrollment  ] = useState( a.enrollment   );
    const [ department   , set_department  ] = useState( a.department   );
    const [ year         , set_year        ] = useState( a.year         );
    const [ semester     , set_semester    ] = useState( a.semester     );
    const [ CGPA         , set_CGPA        ] = useState( a.CGPA         );
    const [ gender       , set_gender      ] = useState( a.gender       );
    const [ address      , set_address     ] = useState( a.address      );
    const [ github       , set_github      ] = useState( a.github       );
    const [ linkedin     , set_linkedin    ] = useState( a.linkedin     );
    const [ aboutUs      , set_aboutUs     ] = useState( a.aboutUs      );

    useEffect(()=>{        
            setDOB          (a.DOB)
            set_phoneNumber (a.phoneNumber)
            set_enrollment  (a.enrollment)
            set_department  (a.department)
            set_year        (a.year)
            set_semester    (a.semester)
            set_CGPA        (a.CGPA)
            set_gender      (a.gender)
            set_address     (a.address)
            set_github      (a.github)
            set_linkedin    (a.linkedin)
            set_aboutUs     (a.aboutUs)
    },[a])
        

    const [error, setError] = useState(null);

    function handleSave() {
        (Data.profile).then((clientUpdation) => {
            const fieldData = {
                phoneNumber,
                enrollment,
                department,
                year,
                semester,
                CGPA,
                DOB,
                gender,
                address,
                github,
                linkedin,
                aboutUs,
            }
            clientUpdation.setclient(fieldData)
                .then(
                    error => {
                        const errorData = error;
                        setError(errorData);
                        if (errorData === null){
                            a.gettingBasicData().then(()=>{
                                props.handleClose();
                            }
                            )
                        }
                    }
                );

        })
    }

    return (
        <>
            <Modal Modal
                open={props.open}
                onClose={props.handleClose}
                sx={{ overflow: { xs: 'scroll' } }}
            >
                <Box sx={style}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Profile <AccountCircleIcon sx={{ fontSize: '2rem' }} />
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>

                            <Grid item lg={6} xs={12}>
                            <Tooltip  title={getSafe(()=>a.instruction.phoneNumber.clause1)} arrow>
                                <TextField id="phoneNumber" variant="filled" fullWidth  label="Phone No" value={phoneNumber} onChange={(e)=>{set_phoneNumber(e.target.value)}} type='tel'  required />
                            </Tooltip>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Tooltip title={getSafe(()=>a.instruction.enrollment.clause1)} arrow>
                                    <TextField id="enrollnment" fullWidth label="Enrollnment No" value={enrollment} onChange={(e)=>{set_enrollment(e.target.value)}} type='text' variant="filled" required />
                                </Tooltip>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <TextField id="department" fullWidth label="Department"  value={department} onChange={(e)=>{set_department(e.target.value)}} type='text' variant="filled" required select>
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
                                    <MenuItem key="Architecture                          " value="BArch" > Architecture                          </MenuItem>
                                    <MenuItem key="Textile Sciences                      " value="TS"     > Textile Sciences                      </MenuItem>
                                    <MenuItem key="Development Studies                   " value="DS"     > Development Studies                   </MenuItem>
                                    <MenuItem key="Management Sciences                   " value="MG"     > Management Sciences                   </MenuItem>
                                    <MenuItem key="Industrial Chemistry                  " value="IC"     > Industrial Chemistry                  </MenuItem>
                                    <MenuItem key="Applied Physics                       " value="AP"     > Applied Physics                       </MenuItem>
                                    <MenuItem key="English Linguistics                   " value="EG"     > English Linguistics                   </MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <TextField id="year" fullWidth label="Year" value={year} onChange={(e)=>{set_year(e.target.value)}} variant="filled" required select>
                                    <MenuItem key="first" value="1">First</MenuItem>
                                    <MenuItem key="second" value="2">Second</MenuItem>
                                    <MenuItem key="third" value="3">Third</MenuItem>
                                    <MenuItem key="final" value="4">Final</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <TextField id="semester" fullWidth label="Semester" value={semester} onChange={(e)=>{set_semester(e.target.value)}} variant="filled" required select>
                                    <MenuItem key="first" value="1">Fall / First</MenuItem>
                                    <MenuItem key="second" value="2">Spring / Second</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Tooltip title={ getSafe(()=>a.instruction.cgpa.clause1) } arrow>
                                    <TextField id="gpa" fullWidth label="CGPA" type='number'  value={CGPA} onChange={(e)=>{set_CGPA(e.target.value)}} inputProps={{ inputProps: { min: 1, max: 4 } }} variant="filled" required />
                                </Tooltip>
                            </Grid>

                            <Grid item lg={4} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker
                                        disableFuture
                                        inputFormat = 'dd/MM/yyyy'
                                        label="Date of birth"
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={DOB}
                                        onChange={(newValue) => {
                                            
                                            const birthday = new Date(newValue);
                                            // const date  = birthday.getDate();
                                            // const Month = birthday.getMonth()+1;
                                            // const year  = birthday.getFullYear()
                                            // console.log(`${date}-${Month}-${year}`)
                                            // setDOB(`${date}-${Month}-${year}`);
                                            console.log(birthday.toISOString())
                                            setDOB(birthday.toISOString());
                                        }}
                                        renderInput={(params) => <TextField {...params} variant="filled" />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="gender" fullWidth label="Gender" value={gender} onChange={(e)=>{set_gender(e.target.value)}} variant="filled" required select>
                                    <MenuItem key="male"    value="M">Male</MenuItem>
                                    <MenuItem key="female"  value="F">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Tooltip title={getSafe(()=>a.instruction.address.clause1)} arrow>
                                    <TextField id="address"  value={address} onChange={(e)=>{set_address(e.target.value)}}  fullWidth label="Address" type="text" variant="filled" required />
                                </Tooltip>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { getSafe(()=>a.instruction.github.clause1)} arrow>
                                    <TextField id="github" fullWidth label="Github"  value={github} onChange={(e)=>{set_github(e.target.value)}}  type="text" variant="filled" placeholder=" e.g., 'https://github.com/waqarshaiiikh' " required />
                                </Tooltip>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { getSafe(()=>a.instruction.linkedin.clause1)} arrow>
                                    <TextField id="linkedin" fullWidth label="Linked In" value={linkedin} onChange={(e)=>{set_linkedin(e.target.value)}}  type="text" variant="filled" placeholder = " e.g., 'https://www.linkedin.com/in/waqar-shaiiikh/' " required />
                                </Tooltip>
                            </Grid>

                            
                            <Grid item lg={12} xs={12}>
                            <Tooltip title= { getSafe(()=>a.instruction.aboutUs.clause1)} arrow>

                                <TextareaAutosize
                                    id="about"
                                    maxRows={5}
                                    value={aboutUs} onChange={(e)=>{set_aboutUs(e.target.value)}} 
                                    required
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write About yourself with in 200 words"
                                    />
                            </Tooltip>
                            </Grid>

                            {
                                error &&
                                <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <> <pre style={{ color: 'red' }}>{error}</pre> </>
                                </Grid>

                            }

                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" onClick={handleSave}>Save</Button>
                            </Grid>

                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}


function SkillData(props) {

    const [skill_update, skill_updation] = useState([]);
    const [NoChange, setNoChange] = useState();

    
    const a = useContext(noteContext)

    const saveSkill = () => {
        if (!NoChange) {

            (Data.skill).then((skill) => {
                skill.setClient(skill_update).then((check) => {
                    if (check) {
                        a.gettingSkillData().then(() => props.handleClose())
                        skill_updation([]);
                    }
                });
            });
        } else {
            props.handleClose()
        }

    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <Box sx={skillStyle}>
                    
                    <IconButton
                        aria-label="close"
                        onClick={props.handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        Update Skills <BeenhereIcon />
                    </Typography>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={12} xs={12}>
                                <Autocomplete
                                    
                                    multiple
                                    id = "checkboxes-tags-demo"
                                    options={a.options}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                    defaultValue={
                                        ()=>{
                                            setNoChange(true)
                                           return a.haveSkills;
                                        }}
                                    
                                    onChange={(event, values) => {
                                        setNoChange(false);
                                        skill_updation(values);
                                    }}

                                    style={{ width: 'inherit' }}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Skills" placeholder="Add..." />
                                    )}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Button variant="contained" onClick={saveSkill} >Save</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}


function ExperienceData(props) {
    const {eid, companyName , startDate, endDate, jobRole, Description} = props.experienceObj;
    const {open , handleClose, status} = props; 
    
    
    const [duration, setDuration] = useState([startDate,endDate] );
    const companyField = useFormInput(companyName);
    const jobField     = useFormInput(jobRole);
    const DesField     = useFormInput(Description);
    
    const a = useContext(noteContext)

    function removeExperience(){
        
        (Data.experience).then((exp)=>{
            exp.remove ({ 
                eid,
                companyName: companyField.value, 
                startDate:  duration[0],
                endDate:    duration[1], 
                jobRole: jobField.value, 
                Description: DesField.value
            }).then((check)=>{
                if(check === true )
                {
                    a.gettingExperienceData().then(() => props.handleClose())
                }else{
                    // props.handleClose()
                }  
                    
            
            });

        });


    }
    
    function addExperience() {

        // console.log({ companyName: companyField.value, startDate: duration[0], endDate: duration[1], jobRole: jobField.value, Description: DesField.value })
        
        (Data.experience).then((exp)=>{
            exp.addExperience ({ 
                companyName: companyField.value, 
                startDate:  duration[0],
                endDate:    duration[1], 
                jobRole: jobField.value, 
                Description: DesField.value
            }).then((check)=>{
                if(check )
                {
                    a.gettingExperienceData().then(() => props.handleClose())
                }else{
                    props.handleClose()
                }  
                    
            
            });
    
        });
    }

    function updateExperience() {
       
        (Data.experience).then((exp)=>{
            exp.modify ({ 
                eid,
                companyName: companyField.value, 
                startDate:  duration[0],
                endDate:    duration[1], 
                jobRole: jobField.value, 
                Description: DesField.value
            }).then((check)=>{
                console.log(check)
                if(check )
                {
                    a.gettingExperienceData().then(() => props.handleClose())
                }else{
                    props.handleClose()
                }  
            });

        });
       
    }

    // const onSubmit = data => console.log(data);
    const onSubmit = (e) => { 
        e.preventDefault();
        status === "Update" ? updateExperience() : addExperience() 
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                
                <Box sx={skillStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={props.handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '2rem', }}>
                        {`${status}  Experience`} <WorkIcon />
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField required fullWidth label="Company Name" {...companyField} type="text"  inputProps={{ maxLength: 30 , minLength: 3  }} variant="filled" />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField required fullWidth label="Job Role" {...jobField} type="text" inputProps={{ maxLength: 30, minLength: 3 }}variant="filled" />
                            </Grid>
                          
                            <Grid item lg={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker            
                                        disableFuture
                                        startText="Start Date"
                                        inputFormat='dd/MM/yyyy'
                                        endText="End Date"
                                        views={['day', 'month', 'year']}
                                        value={duration}
                                        onChange={(value) => {
                                            setDuration(value);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                            <Grid item lg={5} xs={12}>
                                                <TextField fullWidth {...startProps} required variant="filled"/>
                                            </Grid>
                                            <Grid item lg={2} sx={{ textAlign:'center'}} xs={12} >
                                                {/* <Typography sx={{ textAlign:'center' }}> TO </Typography> */}
                                                <Typography > TO </Typography>
                                            </Grid>
                                            <Grid item lg={5} xs={12}>
                                                <TextField fullWidth {...endProps} required variant="filled"/>
                                            </Grid>

                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    label="Job Description"
                                    required
                                    inputProps={{
                                        maxLength: 200,
                                        minLength: 20
                                    }}
                                    variant="filled"
                                    {...DesField}
                                    // style={{ width: '100%', padding: '10px' }}
                                    placeholder="Write Description About your Job in 200 words"
                                />
                            </Grid>

                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                                {status === "Update" && <Button variant="contained" onClick={removeExperience} style={{ marginRight: "10px" }} > Remove</Button>}
                                {/* <input type="submit" label={`${status}`} variant="contained" onClick={() => { status === "Update" ? updateExperience() : addExperience() }}> {`${status}`}</input> */}
                                <Button type="submit" label={`${status}`} variant="contained"> {`${status}`}</Button>
                                {/* <Input type="submit" label={`${status}`} variant="contained" />  */}
                            </Grid>
                        </Grid>
                        </form> 
                </Box>
            </Modal>
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



export { ProfileData, SkillData, ExperienceData }
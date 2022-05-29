import React, { useState } from 'react';
import { Box, Typography, Modal, Grid, Button, TextField, MenuItem, TextareaAutosize, FormControl, Checkbox, Tooltip } from '@mui/material/';
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


function ProfileData(props) {
    
    const basicInfo         = Data.profile.client;
    const instruction       = Data.profile.instruction;
    
    
    const phoneNumber       = useFormInput( basicInfo.phoneNumber || "+92"  );
    const enrollment        = useFormInput( basicInfo.enrollment  || "NED/"  );
    const department        = useFormInput( basicInfo.department  || ""  );
    const year              = useFormInput( basicInfo.year        || ""  );
    const semester          = useFormInput( basicInfo.semester    || ""  );
    const CGPA              = useFormInput( basicInfo.CGPA        || ""  );
    const [DOB, setDOB]     = useState(     basicInfo.DOB         || null);
    const gender            = useFormInput( basicInfo.gender      || ""  );
    const address           = useFormInput( basicInfo.address     || ""  );
    const github            = useFormInput( basicInfo.github      || "https://github.com/waqarshaiiikh"  );
    const linkedin          = useFormInput( basicInfo.linkedin    || "https://www.linkedin.com/in/waqar-shaiiikh/"  );
    const aboutUs           = useFormInput( basicInfo.aboutUs     || ""  );
    
    const [error, setError] = useState(null);

    function handleSave(){
        const fieldData = {
            phoneNumber   : phoneNumber.value, 
            enrollment    : enrollment.value, 
            department    : department.value, 
            year          : year.value, 
            semester      : semester.value, 
            CGPA          : CGPA.value, 
            DOB           : `${DOB}`, 
            gender        : gender.value, 
            address       : address.value, 
            github        : github.value, 
            linkedin      : linkedin.value,
            aboutUs       : aboutUs.value,
        }


        setError(Data.profile.setclient(fieldData));
        error===null && props.handleClose();
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
                            <Tooltip  title={instruction.phoneNumber.clause1} arrow>
                                <TextField id="phoneNumber" fullWidth label="Phone No" {...phoneNumber} type='tel' variant="outlined" required />
                            </Tooltip>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Tooltip title={instruction.enrollment.clause1} arrow>
                                    <TextField id="enrollnment" fullWidth label="Enrollnment No" {...enrollment} type='text' variant="outlined" required />
                                </Tooltip>
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
                                <Tooltip title={ instruction.cgpa.clause1 } arrow>
                                    <TextField id="gpa" fullWidth label="CGPA" type='number' {...CGPA} inputProps={{ inputProps: { min: 1, max: 4 } }} variant="outlined" required />
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
                                            setDOB(Date.parse(newValue));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <TextField id="gender" fullWidth label="Gender" {...gender} variant="outlined" required select>
                                    <MenuItem key="male"    value="M">Male</MenuItem>
                                    <MenuItem key="female"  value="F">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Tooltip title={instruction.address.clause1} arrow>
                                    <TextField id="address" {...address} fullWidth label="Address" type="text" variant="outlined" required />
                                </Tooltip>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { instruction.github.clause1} arrow>
                                    <TextField id="github" fullWidth label="Github" {...github} type="text" variant="outlined" placeholder=" e.g., 'https://github.com/waqarshaiiikh' " required />
                                </Tooltip>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { instruction.linkedin.clause1} arrow>
                                    <TextField id="linkedin" fullWidth label="Linked In"  {...linkedin} type="text" variant="outlined" placeholder = " e.g., 'https://www.linkedin.com/in/waqar-shaiiikh/' " required />
                                </Tooltip>
                            </Grid>

                            
                            <Grid item lg={12} xs={12}>
                            <Tooltip title= { instruction.aboutUs.clause1} arrow>

                                <TextareaAutosize
                                    id="about"
                                    maxRows={5}
                                    {...aboutUs}
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

    const [newSkill, addNewSkill] = useState([]);
   
    const saveSkill = () =>{
       Data.skill.client = newSkill;
       props.handleClose();
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
                                    options={Data.skill.options}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                    defaultValue={Data.skill.client}
                                    
                                    onChange={(event, values) => {
                                        addNewSkill(values);
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
    

    function removeExperience(){
        
        Data.experience.remove({companyName , startDate, endDate, jobRole, Description});
        props.handleClose();

    }
    
    function addExperience() {

        Data.experience.client = { 
            companyName: companyField.value, 
            startDate:  `${duration[0].getDate()}/${duration[0].getMonth()}/${duration[0].getFullYear()}`,
            endDate:    `${duration[1].getDate()}/${duration[1].getMonth()}/${duration[1].getFullYear()}`, 
            jobRole: jobField.value, 
            Description: DesField.value
        };

        props.handleClose();
    }

    function updateExperience() {
       
        const exp = { 
            eid,
            companyName: companyField.value, 
            startDate:  `${duration[0]}`   ,
            endDate:    `${duration[1]}`   , 
            jobRole:     jobField.value    , 
            Description: DesField.value
        };

        Data.experience.modify(exp);
        props.handleClose();
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
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid item lg={6} xs={12}>
                                <TextField id="company" fullWidth label="Company Name" {...companyField} type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField id="role" fullWidth label="Job Role" {...jobField} type="text" variant="outlined" required />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        startText="Start Date"
                                        inputFormat = 'dd/MM/yyyy'
                                        endText="End Date"                                      
                                        views={['day', 'month', 'year']}
                                        value={duration}
                                        onChange={(value) => {
                                            setDuration(value);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <TextareaAutosize
                                    id="about"
                                    maxRows = {5}
                                    required
                                    {...DesField}
                                    style={{ width: '100%', padding: '10px' }}
                                    placeholder = "Write Description About your Job in 200 words"
                                />
                            </Grid>

                            <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                            
                                { status === "Update" && <Button variant="contained" onClick={removeExperience} style={{ marginRight: "10px" }} > Remove</Button>}
                                <Button variant="contained" onClick={()=>{ status === "Update" ? updateExperience() :addExperience()  }}> {`${status}`}</Button>
                                
                            </Grid>

                        </Grid>
                    </FormControl>
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
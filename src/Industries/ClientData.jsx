import React, { useState ,useContext} from 'react';
import { Box, Typography, Modal, Grid, Button, TextField, TextareaAutosize, FormControl, FormGroup, FormControlLabel, Checkbox ,Tooltip} from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';

// import WorkIcon from '@mui/icons-material/Work';

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
    top: { lg: '50%', xs: '50%' },
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

    const [ hrName       , set_hrName      ] = useState( a.industry.hrName       );
    const [ phoneNumber  , set_phoneNumber ] = useState( a.industry.phoneNumber  );
    const [ address      , set_address     ] = useState( a.industry.address      );
    const [ website      , set_website     ] = useState( a.industry.website      );
    const [ linkedin     , set_linkedin    ] = useState( a.industry.linkedin     );
    const [ aboutUs      , setAboutUs      ] = useState( a.industry.aboutUs      );


    useEffect(()=>{        
        set_hrName      (a.industry.hrName)
        set_phoneNumber (a.industry.phoneNumber)
        set_address     (a.industry.address)
        set_website     (a.industry.website)
        set_linkedin    (a.industry.linkedin)
        setAboutUs      (a.industry.aboutUs)
    },[a])
    // console.log( hrName ,phoneNumber  ,address,website ,linkedin ,aboutUs )
        

    const [error, setError] = useState(null);

    function handleSave() {
        (Data.orgProfile).then((clientUpdation) => {
            const fieldData = {
                phoneNumber,
                address,
                linkedin,
                aboutUs,
                hrName,
                website,
            }
            clientUpdation.setclient(fieldData)
                .then(
                    error => {
                        const errorData = error;
                        setError(errorData);
                        if (errorData === null){
                            a.industry.gettingIndBasicData().then(()=>{
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
            <Modal
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
                        
                            <Grid item lg={12} xs={12}>
                                <Tooltip title={getSafe(()=>a.instruction.hrName.clause1)} arrow>
                                    <TextField id="HR NAME"  value={hrName} onChange={(e)=>{set_hrName(e.target.value)}}  fullWidth label="HR NAME" type="text" variant="filled" required />
                                </Tooltip>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Tooltip title={getSafe(() => a.instruction.phoneNumber.clause1)} arrow>
                                    <TextField id="phoneNumber" variant="filled" fullWidth label="MOBILE NO" value={phoneNumber} onChange={(e) => { set_phoneNumber(e.target.value) }} type='tel' required />
                                </Tooltip>
                            </Grid>

                            <Grid item lg={12} xs={12}>
                                <Tooltip title={getSafe(()=>a.instruction.address.clause1)} arrow>
                                    <TextField id="address"  value={address} onChange={(e)=>{set_address(e.target.value)}}  fullWidth label="ADDRESS" type="text" variant="filled" required />
                                </Tooltip>
                            </Grid>

                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { getSafe(()=>a.instruction.website.clause1)} arrow>
                                    <TextField id="website" fullWidth label="WEBSITE"  value={website} onChange={(e)=>{set_website(e.target.value)}}  type="text" variant="filled" placeholder=" e.g., 'https://www.example.com' " required />
                                </Tooltip>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Tooltip title= { getSafe(()=>a.instruction.linkedin.clause1)} arrow>
                                    <TextField id="linkedin" fullWidth label="Linked In" value={linkedin} onChange={(e)=>{set_linkedin(e.target.value)}}  type="text" variant="filled" placeholder = " e.g., 'https://www.linkedin.com/in/waqar-shaiiikh/' " required />
                                </Tooltip>
                            </Grid>
                          
                            <Grid item lg={12} xs={12}>
                                <Tooltip title={getSafe(() => a.instruction.aboutUs.clause1)} arrow>

                                    <TextareaAutosize
                                        id="about"
                                        maxRows={5}
                                        value={aboutUs} onChange={(e) => { setAboutUs(e.target.value) }}
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

function ServiceData(props) {
    const [service_update, service_updation] = useState([]);
    const [NoChange, setNoChange] = useState();


    const a = useContext(noteContext)

    

    const saveService = () => {
        if (!NoChange) {
            (Data.service).then((service) => {
                service.setClient(service_update).then((check) => {
                    if (check) {
                        a.industry.gettingServiceData().then(() => props.handleClose())
                        service_updation([]);
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
                        Update Services <BeenhereIcon />
                    </Typography>
                    <FormControl>
                    <Grid container spacing={1}>
                            <Grid item lg={12} xs={12}>
                                <Autocomplete
                                    
                                    multiple
                                    id = "checkboxes-tags-demo"
                                    options={a.industry.options}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                    defaultValue={()=>{
                                        setNoChange(true)
                                       return a.industry.haveService;
                                    }}
                                    
                                    onChange={(event, values) => {
                                        setNoChange(false);
                                        service_updation(values);
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
                                <Button variant="contained" onClick={saveService} >Save</Button>
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

export { ProfileData, ServiceData}
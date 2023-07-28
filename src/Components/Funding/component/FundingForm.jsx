import { Autocomplete, Box, Grid, TextField, TextareaAutosize, Typography, Button, Checkbox, createFilterOptions } from '@mui/material';
import { DatePicker, DateRangePicker, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useEffect, useState } from 'react'
import useFetchData from '../../../Hook/useFetchData';
import FundingTrack from './FundingTrack'


const requestStyle = {
    // position: 'absolute',
    // top: { lg: '50%', xs: '80%' },
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // border: '1px solid #000',
    // boxShadow: 24,
    width: { xs: '95%', lg: 'auto' },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    margin: 'auto',
    marginTop: '30px',
    p: { lg: 4, xs: 1 },
}



const FundingForm = ({fundingProposalLoading,  getFundingProposal }) => {

    const { data: departmentOptions, fetchData: getsDepartment } = useFetchData();

    const [formFields, setFormFields] = useState({});
    const [consent, setConsent] = useState(false);

    useEffect(() => {
        getsDepartment('/department');
    }, [])
    
    const onFormFieldChange = (e) => {
        setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        getFundingProposal('/funding/apply', 'POST', {...formFields,  studentId: localStorage.getItem('userId')} )
    }

    return (
        <Box sx={requestStyle}>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} sx={{
                    padding: '10px !important',
                }}>

                    <Grid item xs={12}>
                        <Typography variant='h4' style={{ margin: '20px 0' }}> Student Detail</Typography>
                        <TextField id="Name"
                            value={formFields.studentName || ''}
                            onChange={onFormFieldChange}
                            name='studentName'
                            fullWidth
                            label="Full Name"
                            placeholder='Full Name'
                            type='text'
                            variant="outlined"
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="Email" fullWidth label="Email" placeholder='Email' type='text'
                            value={formFields.studentEmail || ''}
                            onChange={onFormFieldChange}
                            name='studentEmail'
                            variant="outlined" required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="rollNumber" fullWidth label="Roll Number" placeholder='Roll No'
                            type='text'
                            value={formFields.studentRollNumber || ''}
                            onChange={onFormFieldChange}
                            name='studentRollNumber'
                            variant="outlined" required />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField id="Contact" fullWidth label="Contact" placeholder='Contact Number'
                            type='text'
                            value={formFields.studentContact || ''}
                            onChange={onFormFieldChange}
                            name='studentContact'
                            variant="outlined" required />
                    </Grid>


                    <Grid item xs={12}>
                        <Autocomplete
                            id="studentDepartment"
                            options={departmentOptions}
                            required
                            onChange={(event, newValue) => {
                                setFormFields(prev => ({ ...prev, studentDepartment: newValue.departmentName }));
                            }}
                            getOptionLabel={(option) => option.departmentName}
                            renderOption={(props, option) => <li {...props}>{option.departmentName}</li>}
                            renderInput={(params) => (
                                <TextField {...params} label="Department Name" required={formFields?.studentDepartment?.length === 0}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h4' style={{ margin: '20px 0' }}> Project Detail </Typography>
                        <TextField
                            id="title"
                            fullWidth
                            label="Title"
                            placeholder='Title of the project'
                            type='text'
                            value={formFields.projectTitle || ''}
                            onChange={onFormFieldChange}
                            name='projectTitle'
                            variant="outlined" required />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={5}
                            id="description"
                            label="Description"
                            placeholder="Brief description of the project"
                            fullWidth
                            value={formFields.projectDescription || ''}
                            onChange={onFormFieldChange}
                            name='projectDescription'
                            required
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            id="duration"
                            label="Duration"
                            placeholder="e.g, 30 day, 1 week,  3 month , 1 year ....."
                            fullWidth
                            required
                            value={formFields.projectDuration || ''}
                            onChange={onFormFieldChange}
                            name='projectDuration'
                        />

                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="Project__Amount" fullWidth label="Requested Amount" placeholder='Amount of Funding Request '
                            type='text'
                            value={formFields.projectAmount || ''}
                            onChange={onFormFieldChange}
                            name='projectAmount'
                            variant="outlined" required />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <TextField
                            multiline
                            rows={5}
                            id="Justification"
                            required
                            placeholder="Justification for the funding"
                            fullWidth
                            label={'Funding Justification'}
                            value={formFields.amountJustification || ''}
                            onChange={onFormFieldChange}
                            name='amountJustification'
                        />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <TextField
                            id="budget"
                            rows={5}
                            required
                            multiline
                            fullWidth
                            label={'Budget Breakdown'}
                            placeholder="e.g., equipment, materials, travel expenses, etc."
                            value={formFields.amountBreakdown || ''}
                            onChange={onFormFieldChange}
                            name='amountBreakdown'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h4' style={{ margin: '20px 0' }}> Supervisor Detail </Typography>
                        <TextField
                            id="Name"
                            fullWidth
                            label="Name"
                            placeholder='Name of the Supervisor'
                            type='text'
                            value={formFields.supervisorName || ''}
                            onChange={onFormFieldChange}
                            name='supervisorName'
                            variant="outlined" required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="Supervisor__Email"
                            fullWidth
                            label="Email"
                            placeholder='Email of the Supervisor'
                            type='email'
                            freeSolo
                            value={formFields.supervisorEmail || ''}
                            onChange={onFormFieldChange}
                            name='supervisorEmail'
                            variant="outlined" required />
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <Autocomplete
                            id="supervisorDepartment"
                            options={departmentOptions}
                            required
                            onChange={(event, newValue) => {
                                setFormFields(prev => ({ ...prev, supervisorDepartment: newValue.departmentName }));
                            }}
                            getOptionLabel={(option) => option.departmentName}
                            renderOption={(props, option) => <li {...props}>{option.departmentName}</li>}
                            renderInput={(params) => (
                                <TextField {...params} label="Department Name" required={formFields?.supervisorDepartment?.length === 0}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item sx={12} >
                        <Box display={{ display: 'flex', alignItems: 'center', color: 'rgba(0, 0, 0, 0.6) !important' }}>
                            <Checkbox defaultValue={false} onChange={() => { setConsent(prev => !prev) }}>
                            </Checkbox>
                            <Typography>Are you Sure? You have entered correct information, otherwise we will take action agents You.  </Typography>
                        </Box>

                    </Grid>

                    <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained" type='submit' disabled={!consent || fundingProposalLoading} >Apply</Button>
                    </Grid>

                </Grid>
            </form>


        </Box>
    )
}

export default FundingForm


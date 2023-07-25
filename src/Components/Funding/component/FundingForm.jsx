// import { Autocomplete, Box, Grid, TextField, TextareaAutosize, Typography, Button, Checkbox } from '@mui/material';
// import React from 'react'

// /**
//  * 

// Student Information:

// Name
// Email address
// Contact number
// Student ID/Registration number
// Department/Faculty // drop down

// Title of the project //textbox
// Brief description of the project (including objectives and expected outcomes) //textarea
// Proposed timeline/duration of the project //textbox date
// Amount of funding requested //textbox number
// Justification for the funding (explain why the funding is needed and how it will contribute to the project) //textarea

// Supervisor Information:
// Name of the supervisor //textbox
// Email address of the supervisor //textbox
// Department/Faculty of the supervisor //dropdown

// Budget Breakdown: //text area
// Itemized breakdown of how the requested funding will be utilized (e.g., equipment, materials, travel expenses, etc.)

// Attachments: (optional) //textarea
// Allow students to upload any additional supporting documents, such as project proposals, detailed budget, etc.

// Terms and Conditions: // aggrement checkbox
// Include a checkbox or statement where the student agrees to abide by the terms and conditions of the funding.

// Submission Confirmation: // alert box

// */

// const requestStyle = {
//     // position: 'absolute',
//     // top: { lg: '50%', xs: '80%' },
//     // left: '50%',
//     // transform: 'translate(-50%, -50%)',
//     width: { xs: '95%', lg: 'auto' },
//     bgcolor: 'background.paper',
//     borderRadius: '10px',
//     // border: '1px solid #000',
//     margin: 'auto',
//     marginTop: '30px',
//     // boxShadow: 24,
//     p: { lg: 4, xs: 1 },
// }


// const FundingForm = () => {


//     const handleSubmit = () => {

//     }

//     return (
//         <Box sx={requestStyle}>


//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={1} sx={{
//                     padding: '10px !important',
//                 }}>

//                     <Grid item xs={12}>
//                         <TextField id="Name" fullWidth label="Full Name" placeholder='Full Name' type='text'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField id="Email" fullWidth label="Email" placeholder='Email' type='text'
//                             //    value={`${fname } ${ lname}`} 
//                             variant="outlined" required />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField id="rollNumber" fullWidth label="Roll Number" placeholder='Roll No'
//                             type='text'
//                             //    value={enrollment}
//                             variant="outlined" required />
//                     </Grid>


//                     <Grid item xs={12}>
//                         <TextField id="Contact" fullWidth label="Contact" placeholder='Contact Number'
//                             type='text'
//                             //    value={`${fname } ${ lname}`} 
//                             variant="outlined" required />
//                     </Grid>


//                     <Grid item xs={12}>
//                         <TextField id="Department" fullWidth label="Department Name" placeholder='Department Name'
//                             type='text'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>



//                     <Grid item xs={12}>
//                         <TextField id="title" fullWidth label="Project Title" placeholder='Title of the project'
//                             type='text'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>

//                     <Grid item lg={12} xs={12}>
//                         <TextareaAutosize
//                             id="description"
//                             maxRows={5}
//                             required
//                             // value={experience}
//                             // onChange={e => setExperience(e.target.value)}
//                             style={{ width: '100%', padding: '10px' }}
//                             placeholder="Brief description of the project"

//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField id="Project__timeline" fullWidth 
//                             label="Project Duration" 
//                         // placeholder='Duration of the project'
//                             type='date'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" 
//                             required />
//                     </Grid>
//                     {/* <DatePicker
//                         label="Date Picker"
//                         format="M/D/YYYY"
//                         defaultValue={dayjs('2022-04-17')}
//                         slotProps={{ field: { shouldRespectLeadingZeros: true } }}
//                     /> */}

//                     <Grid item xs={12}>
//                         <TextField id="Project__Amount" fullWidth label="Requested Amount" placeholder='Amount of Funding Request '
//                             type='text'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>

//                     <Grid item lg={12} xs={12}>
//                         <TextareaAutosize
//                             id="justification"
//                             maxRows={5}
//                             required
//                             // value={experience}
//                             // onChange={e => setExperience(e.target.value)}
//                             style={{ width: '100%', padding: '10px' }}
//                             placeholder="Justification for the funding"

//                         />
//                     </Grid>


//                     <Grid item xs={12}>
//                         <TextField id="Supervisor__Name" fullWidth label="Supervisor Name"
//                          placeholder='Name of the Supervisor'
//                             type='text'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>



//                     <Grid item xs={12}>
//                         <TextField id="Supervisor__Email" fullWidth label="Supervisor Email"
//                          placeholder='Email of the Supervisor'
//                             type='email'
//                             //    value={`${fname } ${ lname}`}
//                             variant="outlined" required />
//                     </Grid>



//                     <Grid item lg={12} xs={12}>
//                         <Autocomplete
//                             // multiple
//                             // required
//                             id="Department"
//                             //   options={departmentOptions ? departmentOptions : []}
//                             disableCloseOnSelect
//                             getOptionLabel={(option) => option.departmentName}
//                             //   value={department}
//                             //   onChange={(e, value) => setDepartment(value)}
//                             renderOption={(props, option, { selected }) => (
//                                 <li {...props}>
//                                     <Checkbox
//                                         // icon={icon}
//                                         // checkedIcon={checkedIcon}
//                                         style={{ marginRight: 8 }}
//                                         checked={selected}
//                                     />
//                                     {option.departmentName}
//                                 </li>
//                             )}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Department"
//                                 // required={department===''} 
//                                 />
//                             )}
//                         />
//                     </Grid>



//                     <Grid item lg={12} xs={12}>
//                         <TextareaAutosize
//                             id="budget__breakdown"
//                             maxRows={5}
//                             required
//                             // value={experience}
//                             // onChange={e => setExperience(e.target.value)}
//                             style={{ width: '100%', padding: '10px' }}
//                             placeholder="e.g., equipment, materials, travel expenses, etc."

//                         />
//                     </Grid>


                    




//                     {/* <Grid item lg={12} xs={12}>
//                 <Autocomplete
//                   multiple
//                   required
//                   id="Teams Compositions"
//                   value={teamComposition}

//                   onChange={(event, newValue) => {
//                     setTeamComposition(newValue);
//                   }}
//                   selectOnFocus
//                   clearOnBlur
//                   handleHomeEndKeys
//                   filterOptions={(options, params) => {
//                     const filtered = filter(options, params);
//                     const { inputValue } = params;

//                     // Suggest the creation of a new value
//                     const isExisting = options.some((option) => inputValue === option);
//                     if (inputValue !== '' && !isExisting) {
//                       filtered.push(inputValue);
//                     }
//                     return filtered;
//                   }}

//                   options={teamComposition}
//                   freeSolo
//                   getOptionLabel={(option) => option}

//                   renderOption={(props, option) => {
//                     if (teamComposition.filter(o => o === option).length === 0)
//                       return <li {...props}>{`Add "${option}"`}</li>;
//                     return <li {...props}>{option}</li>
//                   }}

//                   renderInput={(params) => (
//                     <TextField {...params} label="Teams Compositions" required={teamComposition.length===0} />
//                   )}
//                 />
//               </Grid> */}

             


//                     <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
//                         <Button
//                             // disabled={projectLoading}
//                             variant="contained" type='submit'>Apply</Button>
//                     </Grid>

//                 </Grid>
//             </form>
//         </Box>
//     )
// }

// export default FundingForm


import React from 'react'

const FundingForm = () => {
  return (
    <div>FundingForm</div>
  )
}

export default FundingForm



  /****
   * 
   * 
   * 
   {
  "data": [
    {
      "ID": 81,
      "FNAME": "Muhammad",
      "LNAME": "Waqar",
      "DEPARTMENT": "SE",
      "YEAR": "4",
      "UNIVERSITY": "NED UNIVERSITY",
      "IMAGE": "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
      "ABOUTUS": "passionate developer"
    },
    {
      "ID": 75,
      "FNAME": "Muhammad",
      "LNAME": "Waqar",
      "DEPARTMENT": "SE",
      "YEAR": "4",
      "UNIVERSITY": "NED UNIVERSITY",
      "IMAGE": "http://res.cloudinary.com/dksfpant5/image/upload/v1659511175/IACSImages/student/75.jpg",
      "ABOUTUS": "Problem solving, Hard working,  Enjoying on solving problems, Aim to be professional...."
    }
  ],
  "total": 2
}
   */

// EXPERIENCE
// SKILLS
// COMPNAYNAME
// JOBROLE
// STARTDATE
// ENDDATE


// jobs

COMPANYNAME
JOBROLE
CITY
TYPE
REQUIREDSKILLS

// SOFTWARE HOUSE

COMPANYNAME
ADDRESS
SERVICES
















// const StudentJob = () => {
//     const classes = useStyles();

//     const [requestJob, setRequestJob] = useState(false);
//     const openRequest = () => setRequestJob(true);
//     const closeRequest = () => setRequestJob(false);

//     const [search, setSearch] = useState(1);
//     const [jobRole, setJobRole] = useState('');
//     const [jobType, setJobType] = useState('');
//     const [jobs, setJobs] = useState();
//     const [postCount, setPostCount] = useState(null);
//     const [showPerPage] = useState(4);
//     const [total, setTotal] = useState(0);
//     const [pagination, setPagination] = useState({
//         start: 0,
//         end: showPerPage
//     });
//     const [loading, setLoading] = useState(false);
//     const [value, setValue] = useState();

//     const onPaginationChange = (start, end) => {
//         setPagination({
//             start: start,
//             end: end
//         })
//     handleSearch(null, start, end).then(()=>{
//     });
//     }

//     const handleChange = (event) => {
//         console.log(event.target.value)
//         setSearch(event.target.value);
//     };

//     const handleJobRole = (event) => {
//         console.log(event.target.value)
//         setJobRole(event.target.value);
//     };

//     const handleJobType = (event) => {
//         console.log(event.target.value)
//         setJobType(event.target.value);
//         setValue(event.target.value);
//       };

      
//   const updateJobSkill = async (expanded, index, job) => {
//     if (!jobs[index]?.skills && expanded) {
//       await apiCAll(`/api/user/job/skill/get`, 'post', { job:{ id : job.ID } }).then((res) => {

//         console.log(res.data);
//         let st = jobs;
//         let skill_STD = st[index];
//         skill_STD = { ...skill_STD, skills: res?.data };
//         st[index] = skill_STD;
//         setJobs([...st])
//         // console.log(res?.data);
//         // console.log(studentData)
        
//       }).catch((err) => {
//         console.log(err);
//       })

//     }
//   }


//     const loadJobs = async (start = 0, end = showPerPage) => {

//         await apiCAll(`/api/user/student/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
//             console.log(res?.data);
//             setJobs(res?.data.data);
//             setTotal(res?.data.total);
//             setPostCount(res?.data.total);
//         }).catch((err) => {
//             console.log(err);
//         })
//         setLoading(false);
//     }

//     const handleSearch = async (e, start = 0, end = showPerPage) => {
//         setLoading(true);
//         e?.preventDefault();

//         console.log(value, search)
//         if (!value || !search) {
//           return await loadJobs(start, end).then(() => {
//             setLoading(false)
//             return null;
//           });
//         }

//         switch (search) {
//             case 1: {
//               await apiCAll(`/api/user/job/searchBy/companyName`, 'post', { pagination: { starts: start, totalRows: end - start }, companyName: { query: value }, }).then((res) => {
//                 console.log(res?.data);
//                 setJobs(res?.data.data);
//                 setPostCount(res?.data.total);
//                 setTotal(res?.data.total);
//               }).catch((err) => {
//                 console.log(err);
//               })
//               setLoading(false);
//             } break;
//             case 2: {
//               await apiCAll(`/api/user/job/searchBy/tittle`, 'post', { pagination: { starts: start, totalRows: end - start }, tittle: { query: value }, }).then((res) => {
//                 console.log(res?.data);
//                 setJobs(res?.data.data);
//                 setTotal(res?.data.total);
//                 setPostCount(res?.data.total);
//               }).catch((err) => {
//                 console.log(err);
//               })
//               setLoading(false);
//             } break;
//             case 3: {
//               await apiCAll(`/api/user/job/searchBy/address`, 'post', { pagination: { starts: start, totalRows: end - start }, address: { query: value }, }).then((res) => {
//                 console.log(res?.data);
//                 setJobs(res?.data.data);
//                 setTotal(res?.data.total);
//                 setPostCount(res?.data.total);
//               }).catch((err) => {
//                 console.log(err);
//               })
//               setLoading(false);
//             } break;
//             case 4: {
//               await apiCAll(`/api/user/job/searchBy/location`, 'post', { pagination: { starts: start, totalRows: end - start }, location: { query: value }, }).then((res) => {
//                 console.log(res?.data);
//                 setJobs(res?.data.data);
//                 setTotal(res?.data.total);
//                 setPostCount(res?.data.total);
//               }).catch((err) => {
//                 console.log(err);
//               })
//               setLoading(false);
//             } break;
//             case 5: {
//               await apiCAll(`/api/user/job/searchBy/skill`, 'post', { pagination: { starts: start, totalRows: end - start }, skill: { query: value }, }).then((res) => {
//                 console.log(res?.data);
//                 setJobs(res?.data.data);
//                 setTotal(res?.data.total);
//                 setPostCount(res?.data.total);
//               }).catch((err) => {
//                 console.log(err);
//               })
//               setLoading(false);
//             } break;
//             default: {
//               alert("Please select the category")
//             }
//           }


//         // if (value) {
//         //     await apiJson(`/jobs?q=${value}`).then((res) => {
//         //         setJobs(res.data);
//         //         console.log(res?.data)
//         //         setTotal(res?.data.length);
//         //         setPostCount(res?.data.length);
//         //         setValue("");
//         //     }).catch((err) => {
//         //         console.log(err);
//         //     })
//         // }
//         // else {
//         //     alert("Please Enter text to search");
//         // }
//         setLoading(false);
//     }


//     useEffect(() => {
//         loadJobs();
//         setLoading(true);
//     }, [])
//     return (
//         <>
//             <MetaData title="Jobs" />
//             <Navbar />
//             <PostJob open={requestJob} handleClose={closeRequest} />
//             <Container maxWidth="xl" sx={{ padding: '0' }}>
//                 <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Grid item lg={10} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
//                         <h1>Jobs</h1>
//                     </Grid>
//                     <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
//                         <div>
//                             {
//                                 search == 2 ?
//                                     (<Box sx={{ minWidth: 120 }}>
//                                         <FormControl fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
//                                             <Select
//                                                 labelId="demo-simple-select-label"
//                                                 id="demo-simple-select"
//                                                 value={jobRole}
//                                                 label="Job Role"
//                                                 onChange={handleJobRole}
//                                                 sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
//                                             >
//                                                 <MenuItem value="fullStack">Full Stack Developer</MenuItem>
//                                                 <MenuItem value="frontend">Front End Developer</MenuItem>
//                                                 <MenuItem value="backend">Back End Developer</MenuItem>
//                                                 <MenuItem value="database">Database Engineer</MenuItem>
//                                                 <MenuItem value="softwareEngineer">Software Engineer</MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </Box>) :
//                                     (search == 4 ?
//                                         (<Box sx={{ minWidth: 120 }}>
//                                             <FormControl fullWidth>
//                                                 <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
//                                                 <Select
//                                                     labelId="demo-simple-select-label"
//                                                     id="demo-simple-select"
//                                                     value={jobType}
//                                                     label="Search"
//                                                     onChange={handleJobType}
//                                                     sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
//                                                 >
//                                                     <MenuItem value="onsite">Onsite</MenuItem>
//                                                     <MenuItem value="remote">Remote</MenuItem>
//                                                 </Select>
//                                             </FormControl>
//                                         </Box>) :
//                                         (<TextField
//                                             id="search"
//                                             label="search"
//                                             variant="outlined"
//                                             size='medium'
//                                             value={value}
//                                             onChange={(e) => { setValue(e.target.value) }}
//                                             onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
//                                             sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />))
//                             }
//                         </div>
//                         <Box sx={{ minWidth: 120 }}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Search By</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={search}
//                                     label="Search"
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value={1}>Company Name</MenuItem>
//                                     <MenuItem value={2}>Title</MenuItem>
//                                     <MenuItem value={3}>Address</MenuItem>
//                                     <MenuItem value={4}>Location</MenuItem>
//                                     <MenuItem value={5}>Skills</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                         <SearchIcon
//                             fontSize='large'
//                             onClick={handleSearch}
//                             sx={{ color: '#42b6EE', cursor: 'pointer', marginTop: { lg: 'none', xs: '10px' }, }} />
//                     </Grid>
//                     <Grid item lg={12} xs={12}>
//                         <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Request Job</Button>
//                     </Grid>
//                     <Grid item lg={10} xs={12} >
//                         <Grid container spacing={2}>
//                             {
//                                 loading ?
//                                     (
//                                         <Backdrop
//                                             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
//                                             <CircularProgress color="inherit" />
//                                         </Backdrop>
//                                     ) : ((postCount === 0) ?
//                                         (
//                                             <div className='Post_center'>
//                                                 <h1 className='main_heading'>No Result Found</h1>
//                                             </div>
//                                         ) :
//                                         (jobs && jobs.map((job, index) => (
//                                             <Grid item lg={12} key={index}>
//                                                 <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
//                                                     <div className={classes.software_title}>
//                                                         <div>
//                                                             <h3 className='mobileHeading'>{job.COMPANYNAME}</h3>
//                                                             <Typography>{job.TITTLE}</Typography>
//                                                             <Typography>{job.ADDRESS}</Typography>
//                                                             <div>
//                                                                 <Typography sx={{ display: 'inline-block' }}>{job.DURATION}</Typography>,&nbsp;
//                                                                 <Typography sx={{ display: 'inline-block' }}>{job.LOCATION}</Typography>
//                                                                 <a style={{ display: 'block' }} href="https://www.google.com/" target={"_blank"}>Detail</a>
//                                                             </div>
//                                                         </div>
//                                                         <div>
//                                                             <Typography sx={{ display: 'block', textAlign: 'right', color: '#d3d3d3' }}>24-8-22</Typography>
//                                                             <img className={classes.software_image} src={job.IMAGE} alt="student" />
//                                                         </div>
//                                                     </div>
//                                                     <Accordion>
//                                                         <AccordionSummary
//                                                             expandIcon={<ExpandMoreIcon />}
//                                                             aria-controls="panel1a-content"
//                                                             id="about"
//                                                         >
//                                                             <Typography>Description</Typography>
//                                                         </AccordionSummary>
//                                                         <AccordionDetails>
//                                                             <Typography>
//                                                                 {job.DESCRIPTION}
//                                                             </Typography>
//                                                         </AccordionDetails>
//                                                     </Accordion>
//                                                     <Accordion>
//                                                         <AccordionSummary
//                                                             expandIcon={<ExpandMoreIcon />}
//                                                             aria-controls="panel1a-content"
//                                                             id="skills"
//                                                         >
//                                                             <Typography>Required Skills</Typography>
//                                                         </AccordionSummary>
//                                                         <AccordionDetails>
//                                                             <Typography>
//                                                                 {
//                                                                     job.requiredSkill && job.requiredSkill.map((services, i) => (
//                                                                         <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
//                                                                 }
//                                                             </Typography>
//                                                         </AccordionDetails>
//                                                     </Accordion>
//                                                 </Box>
//                                             </Grid>
//                                         )))
//                                     )
//                             }
//                         </Grid>
//                     </Grid>
//                     <Box sx={{ margin: '20px 0px' }}>
//                         <Pagination showPerPage={showPerPage}
//                             onPaginationChange={onPaginationChange}
//                             numberOfButtons={Math.ceil(total / showPerPage)}
//                         />
//                     </Box>
//                 </Grid>
//             </Container>
//         </>
//     )
// }
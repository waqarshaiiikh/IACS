import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Container,
  Grid,
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  CircularProgress,
  Backdrop,
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import Pagination from '../Pages/Pagination';
import AdminNavbar from './AdminNavbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../MetaData';
import { Api, apiCAll, apiJson } from '../integration/apiCall';
import ClientNavbar from '../Industries/ClientNavbar';

const useStyles = makeStyles({
  searching: {
    width: '100%',
    border: '1px solid',
    borderRadius: '10px',
  },
  search_div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '800px',
    height: '40px',
    marginRight: '10px',
    border: '1px solid black',
    boxSizing: 'border-box'
  },
  search: {
    width: '100%',
    fontSize: '1.1rem',
    padding: '5px',
    border: 'none',
    outline: 'none'
  },
  search_icon: {
    margin: '0',
    width: '50px',
    height: '100%',
    fontSize: '1.5rem',
    background: 'hsl(0, 0%, 18.82%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  student_title: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  student_image: {
    width: '100px',
    height: '100px'
  }
});

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const AdminRequest = () => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const [studentsRequest, setStudentsRequest] = useState(false);
  const [postCount, setPostCount] = useState();
  const [showPerPage] = useState(4)
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });
  const onPaginationChange = (start, end) => {

    setPagination({
      start: start,
      end: end
    });
    loadRequest(start, end).then(() => {
    });
  }

  const getStudentYear = (studentYear) => {
    switch (studentYear) {
      case "1":
        return "First year";
        break;
      case "2":
        return "Second Year";
        break;
      case "3":
        return "Third Year";
        break;
      case "4":
        return "Final year";
        break;
      default:
        return "None"
    }
  }

  const loadRequest = async (start = 0, end = showPerPage) => {

    await apiCAll(`/api/user/request/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      console.log(res?.data);
      setStudentsRequest(res?.data.data);
      // setStudents(res?.data);
      setTotal(res?.data.total);
      setPostCount(res?.data.total);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  useEffect(() => {
    loadRequest();
    setLoading(true)
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          theme={theme} />
        <Main open={open}>
          <DrawerHeader />
          <MetaData title="Students" />
          <Container maxWidth="xl" sx={{ padding: '0' }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                <h1>Requests</h1>
              </Grid>
              <Grid item lg={12} xs={12} className={classes.studentList} >
                <Grid container spacing={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  {loading ? (
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) : ((postCount === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) : (
                      // studentData && studentData.slice(pagination.start, pagination.end).map((student, index1) => (
                      studentsRequest && studentsRequest.map((student, index1) => (
                        <Grid Grid item lg={10}>
                          <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                            <div className={classes.student_title}>
                              <img className={classes.student_image} src={student.IMAGE} alt="student" />
                              <div>
                                <Typography variant='h6'>{student.NAME}</Typography>
                                <Typography>{Api.DEPARTMENT[student.DEPARTMENT]}</Typography>
                                <Typography>{getStudentYear(student.YEAR)}</Typography>
                                <Typography>{student.UNIVERSITY}</Typography>


                              </div>
                            </div>
                            <div>
                                <Typography><b>Request Tittle : </b>{student.TITTLE}</Typography>
                                <Typography><b>Request For : </b>{student.REQ_TYPE}</Typography>
                                <Typography><b>Duration : </b>{student.DURATION}</Typography>
                                <Typography><b>Location : </b>{student.LOCATION}</Typography>
                                <Typography><b>Date : </b>{student.REQUESTDATE.split('T')[0]}</Typography>
                                
                            </div>
                          
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="about"
                              >
                                <Typography>Description</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  {student.DESCRIPTION}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        </Grid>
                      ))
                    ))
                  }
                </Grid>
              </Grid>
              <Box sx={{ margin: '20px 0px' }}>
                <Pagination showPerPage={showPerPage}
                  onPaginationChange={onPaginationChange}
                  numberOfButtons={Math.ceil(total / showPerPage)}
                />
              </Box>
            </Grid>
          </Container>
        </Main>
      </Box>
      <div>

      </div>

    </>
  )
}

export default AdminRequest
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AdminNavbar from './AdminNavbar';
import Pagination from '../Pages/Pagination';
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  TextField,
  CircularProgress,
  Backdrop
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../MetaData';
import "../CSS/Utils.css"

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
    width: '80%',
    height: '40px',
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
  software_title: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  software_image: {
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


const AdminSoftwareHouses = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [softwareHouse, setSoftwareHouse] = useState(null);
  const [postCount, setPostCount] = useState(null)
  const [showPerPage] = useState(5)
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const classes = useStyles();

  const onPaginationChange = (start, end) => {
    setPagination({
      start: start,
      end: end
    })
  }

  const loadPost = async () => {
    await axios.get(`http://localhost:3001/softwareHouse`).then((res) => {
      setSoftwareHouse(res.data);
      setTotal(res?.data.length);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  const handleSearch = async (e) => {
    setLoading(true)
    e?.preventDefault();
    if (value) {
      await axios.get(`http://localhost:3001/softwareHouse?q=${value}`).then((res) => {
        setSoftwareHouse(res.data);
        setTotal(res?.data.length);
        setValue("");
        setPostCount(res?.data.length);
      }).catch((err) => {
        console.log(err);
      })
    }
    else {
      alert("Enter text to search");
    }
    setLoading(false)
  }

  useEffect(() => {
    loadPost();
    setLoading(true);
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        theme={theme} />
      <Main open={open}>
        <DrawerHeader />
        <MetaData title="Admin Software Houses" />
        <Container maxWidth="xl" sx={{ padding: '0' }}>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
              <h1>Software House</h1>
            </Grid>
            <Grid item lg={12}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: { lg: 'none', xs: "10px" }
              }}>
              <div>
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  size='medium'
                  value={value}
                  onChange={(e) => { setValue(e.target.value) }}
                  sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                  onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }} />
                <SearchIcon
                  fontSize='large'
                  onClick={handleSearch}
                  sx={{
                    color: '#42b6EE',
                    cursor: 'pointer',
                    marginTop: { lg: 'none', xs: '10px' },
                  }} />
              </div>

            </Grid>
            <Grid item lg={10} xs={12} >
              <Grid container spacing={2}>
                {
                  loading ? (
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) : ((postCount === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) :
                    (softwareHouse && softwareHouse.slice(pagination.start, pagination.end).map((softwareHouse, index) => (
                      <Grid item lg={12} xs={12} key={index}>
                        <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <div className={classes.software_title}>
                            <div>
                              <h3 className='mobileHeading'>{softwareHouse.name}</h3>
                              <Typography>{softwareHouse.city}</Typography>
                            </div>
                            <img className={classes.software_image} src={softwareHouse.image} alt="software" />
                          </div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="about"
                            >
                              <Typography>About</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {softwareHouse.about}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="skills"
                            >
                              <Typography>Services</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {
                                  softwareHouse.services.map((service, index) => (
                                    <Chip label={service} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                }
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </Grid>
                    )))
                  )
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
  )
}

export default AdminSoftwareHouses
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AdminNavbar from './AdminNavbar';
import Pagination from '../Pages/Pagination';
import "../CSS/AdminDashboard.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  Chip,
  Container,
  CircularProgress,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import { apiCAll, apiJson } from '../integration/apiCall';

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

const message = [
  {
    NAME:"Khalid"
  }
];


const AdminMessage = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
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
    })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadMessage = async () => {

    await apiJson(`/internships`).then((res) => {
      setMessage(res?.data);
      setTotal(res?.data.length);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        theme={theme} />
      <Main open={open}>
        <DrawerHeader />
        <MetaData title="Admin Messages" />
        <Container sx={{ background: '#FAF9F6	', overflow: 'hidden', borderRadius: '20px', padding: '1vmax', width: '100vw', height: { lg: '90vh' }, display: { lg: 'flex' }, alignItems: { lg: 'center' } }}>
          <Grid container spacing={2}>
            <Grid item sx={{ textAlign: 'center' }} lg={12}>
              <h1>Messages</h1>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="adminMessage">
                <h2>Name</h2>
                <span>123@gmail.com</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dicta aperiam repudiandae officia, eveniet adipisci vitae amet culpa? Quidem iure facere nemo reiciendis amet tempore ipsum aut, deleniti sunt nobis?</p>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="adminMessage">
                <h2>Name</h2>
                <span>123@gmail.com</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dicta aperiam repudiandae officia, eveniet adipisci vitae amet culpa? Quidem iure facere nemo reiciendis amet tempore ipsum aut, deleniti sunt nobis?</p>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="adminMessage">
                <h2>Name</h2>
                <span>123@gmail.com</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dicta aperiam repudiandae officia, eveniet adipisci vitae amet culpa? Quidem iure facere nemo reiciendis amet tempore ipsum aut, deleniti sunt nobis?</p>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="adminMessage">
                <h2>Name</h2>
                <span>123@gmail.com</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dicta aperiam repudiandae officia, eveniet adipisci vitae amet culpa? Quidem iure facere nemo reiciendis amet tempore ipsum aut, deleniti sunt nobis?</p>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ margin: '20px 0px' }}>
          <Pagination showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            numberOfButtons={Math.ceil(total / showPerPage)}
          />
        </Box>
      </Main>
    </Box>
  )
}

export default AdminMessage
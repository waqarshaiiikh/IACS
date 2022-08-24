import React, { useState , useEffect} from 'react';
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

const mss = [
  {
    FULL_NAME: "",
    EMAIL: "",
    MESSAGE: ""
  }
];


const AdminMessage = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState(mss);
  const [postCount, setPostCount] = useState(null)
  const [showPerPage] = useState(6)
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
    loadMessage(start, end).then(() => {
    });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadMessage = async (start = 0, end = showPerPage) => {

    await apiCAll(`/api/user/message/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      console.log(res?.data);
      setMessage(res?.data.data);
      // setStudents(res?.data);
      setTotal(res?.data.total);
      setPostCount(res?.data.total);
    }).catch((err) => {
      console.log(err);
    })
    setLoading(false);
  }

  useEffect(() => {
    loadMessage();
    setLoading(true)
  }, [])

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
            {
              messages.map((message, index1) => (
                <>
                  <Grid item lg={4} xs={12} key={index1}>
                    <div className="adminMessage">
                      
                      <Typography><b>Name : </b>{message.FULL_NAME}</Typography>
                      <Typography><b>Email : </b>{message.EMAIL}</Typography>
                      <Typography><b>Message : </b>{message.MESSAGE}</Typography>
                      <Typography><b>Date : </b>{message?.MES_DATE?.split('T')[0]}</Typography>

                    </div>
                  </Grid>
                </>
              ))
            }
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
import * as React from 'react';
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import MetaData from '../MetaData';
import "../CSS/Utils.css";
import "../CSS/AdminDashboard.css";
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Admin = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const data = [
    { argument: 'First Year', value: 20 },
    { argument: 'Second Year', value: 30 },
    { argument: 'Third Year', value: 35 },
    { argument: 'Final Year', value: 40 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavbar open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        theme={theme} />
      <Main open={open}>
        <DrawerHeader />
        <MetaData title="Admin Home" />
        <Container sx={{ background: '#FAF9F6	', overflow: 'hidden', borderRadius: '20px', width: '100vw', height: { lg: '85vh' }, display: { lg: 'flex' }, alignItems: { lg: 'center' } }}>
          <Grid container spacing={5} justifyContent="center" alignItems="center" >
            <Grid item lg={3} xs={12}>
              <div className="adminCard adminStatics">
                <Link to="/admin/SoftwareHouses" className='link'>
                  <div className='staticsNumber'>
                    <p>Software House</p>
                    <h1>15</h1>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid item lg={3} xs={12}>
              <div className="adminCard adminStatics">
                <Link to="/admin/Students" className='link'>
                  <div className='staticsNumber'>
                    <p>Students</p>
                    <h1>20</h1>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid item lg={3} xs={12}>
              <div className="adminCard adminStatics">
                <Link to="/admin/Jobs" className='link'>
                  <div className='staticsNumber'>
                    <p>Jobs</p>
                    <h1>25</h1>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid item lg={3} xs={12}>
              <div className="adminCard adminStatics">
                <Link to="/admin/Internships" className='link'>
                  <div className='staticsNumber'>
                    <p>Internships</p>
                    <h1>30</h1>
                  </div>
                </Link>
              </div>
            </Grid>
            <Grid item lg={6} xs={12}>
              <div className="adminCard adminChart">
                <div className='staticsChart'>
                  <div>
                    <h5>Students Stactics</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <ul class="staticList">
                        {
                          data.map((item, index) => (
                            <li key={index}>{item.argument}<span style={{ marginLeft: '10px' }}>{item.value}</span></li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                  <div>
                    <Chart
                      data={data}
                    >
                      <PieSeries valueField="value" argumentField="argument" />
                    </Chart>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  )
}

export default Admin
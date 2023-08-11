import * as React from 'react';
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "../CSS/AdminDashboard.css"
import {  Button } from '@mui/material';
import { apiCAll } from '../integration/apiCall';

const drawerWidth = 200;

const useStyles = makeStyles({
    navbar: {
      background: '#42b6EE !important',
      position: 'sticky !important',
      zIndex: 999,
    },
    button: {
      letterSpacing: '2px',
      color: 'white !important',
      fontSize: '1.1rem !important',
      fontWeight: 'bold',
      margin: '0px 20px !important',
  
      '&:focus': {
        outline: 'none',
      }
    },
    icon:{
  
      '&:hover':{
        color:"white !important",
        textDecoration : 'none !important'
      }
    }
  });

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AdminNavbar = ({ open, handleDrawerOpen, handleDrawerClose, theme }) => {

    const logoutFunction = () => {
        apiCAll('/api/login/admin/logout','post')
        .then((res)=>{
            console.log(res.data)
            localStorage.clear();
            // navigate("/")
            window.location.href = "/";
            window.location.href = "/";
        }).catch((e)=>{
        //   console.log(e)
          localStorage.clear();
          // navigate("/")
          window.location.href = "/";
          window.location.href = "/";
        })
      };
    
  const classes = useStyles();

    return (
        <Box 
        // sx={{ display: 'block' }}
        >
            <CssBaseline />
            <AppBar sx={{ background: '#42b6EE' }} open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link style={{ textDecoration: "none", color:'white' }} to="/admin/Home">
                        <Typography variant='h6'>
                            Admin Panel
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>

                        <Button x={{ my: 2, color: 'white', display: 'block' }}
                            className={classes.button} onClick={logoutFunction} component={Link} to="/">
                            Logout
                        </Button>

                    </Box>



                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                {/* <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader> */}
                <Divider />
                <List>
                    {
                        ['Home', 'Students', 'Companies', 'Jobs', 'Internships', 'Request', 'Messages', 'Funding'].map((item, index) => (
                            <Link style={{ textDecoration: "none" }} to={`/admin/${item}`} key={index}>
                                <ListItem disablePadding >
                                    <ListItemButton sx={{ '&:hover': { color: '42b6EE' } }} >
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default AdminNavbar
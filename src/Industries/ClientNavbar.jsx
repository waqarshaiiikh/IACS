import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const { apiCAll}= require('../integration/apiCall');


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
  }
});



const ClientNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();
  const a = useContext(noteContext)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutFunction = () => {
    setAnchorElUser(null);
    apiCAll('/api/logout','get')
    .then((res)=>{
        localStorage.clear();
        window.location.href = "/";
        window.location.href = "/";
    }).catch((e)=>{
      if(e.response !== undefined)
      {
        localStorage.clear();
        window.location.href = "/";
        window.location.href = "/";
      }
    })
  };

  
  const logoutAllfun = () => {
    setAnchorElUser(null);
    apiCAll('/api/logout/all','get')
    .then((res)=>{
      localStorage.clear();
      window.location.href = "/";
      window.location.href = "/";
    }).catch(()=>{
      
      localStorage.clear();
      window.location.href = "/";
      window.location.href = "/";
    })
  };


  return (
    <AppBar className={classes.navbar}  >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, '&:hover': {textDecoration:'none', color : 'white'} }}
          >
            <i className='fab fa-typo3' /> IACS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/clistudent" >Student</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/clijob" >Jobs</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/cliinternship">Internhsips</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/industry/project">Projects</Typography>
              </MenuItem>

              {!a.Signin &&
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to="/signup">Sign up</Typography>
                </MenuItem>
              }
              {!a.Signin &&
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to="/signin">Log in</Typography>
                </MenuItem>
              }
            
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, '&:hover': {textDecoration:'none', color : 'white'} }}
          >
            <i className='fab fa-typo3' /> IACS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/clistudent">
              Student
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/clijob">
              Jobs
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/cliinternship">
              Internships
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/industry/project">
              Projects
            </Button>

            {!a.Signin &&

              <Button x={{ my: 2, color: 'white', display: 'block' }}
                className={classes.button} component={Link} to="/signup">
                Sign up
              </Button>
            }
            {!a.Signin &&

              <Button x={{ my: 2, color: 'white', display: 'block' }}
                className={classes.button} component={Link} to="/signin">
                Log in
              </Button>

            }

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={a?.insdustry?.CompanyName?.charAt(0)} src={a.url} sx={{ width: 35, height: 35, bgcolor: 'rgb(66, 182, 238)', border: '2px solid white ' }}>{a?.industry?.CompanyName?.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" sx={{'&:hover': {textDecoration:'none', color : 'inherit'} }} component={Link} to="/clidashboard">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" sx={{'&:hover': {textDecoration:'none', color : 'inherit'} }} component={Link} to="/clientProfile">Profile</Typography>
              </MenuItem>
              {a.Signin &&

                <MenuItem onClick={logoutFunction}>
                  <Typography textAlign="center" sx={{ '&:hover': { textDecoration: 'none', color: 'inherit' } }} component={Link} to="/">Logout</Typography>
                </MenuItem>
              }
              {a.Signin &&
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" sx={{'&:hover': {textDecoration:'none', color : 'inherit'} }} onClick={logoutAllfun}>Logout All</Typography>
              </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ClientNavbar;

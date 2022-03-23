import * as React from 'react';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@material-ui/core";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


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

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();

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

  return (
    <AppBar className={classes.navbar}  >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
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
                <Typography textAlign="center" component={Link} to="/job" >Jobs</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/internship">Internhsips</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/project">Trainings</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/project">Projects</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/scholarship">Scholarships</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/signup">Sign up</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link} to="/signin">Log in</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <i className='fab fa-typo3' /> IACS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/job">
              Jobs
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/internship">
              Internships
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/project">
              Trainings
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/project">
              Projects
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/scholarship">
              Scholarships
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/signup">
              Sign up
            </Button>
            <Button x={{ my: 2, color: 'white', display: 'block' }}
              className={classes.button} component={Link} to="/signin">
              Log in
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';


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

const SupervisorNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.navbar}  >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex', justifyContent: 'center'}}>
          <Typography
            variant="h6"
            noWrap
            component={Link} to="/"
            sx={{ mr: 2, '&:hover': {textDecoration:'none', color : 'white'} }}
          >
            <i className='fab fa-typo3' /> IACS
          </Typography>  
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SupervisorNavbar;

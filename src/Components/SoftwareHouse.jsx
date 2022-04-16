import React from 'react'
import Navbar from './Navbar';
import {
    Container, Grid, FormGroup, FormControlLabel,
    Checkbox, Box, Accordion, AccordionSummary,
    AccordionDetails, Typography, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import softwareHouse from "../Images/softwareHouselogo.png";

const searchService = [
    "Web Development", "Mobile App Development",
    "Graphis Designing",
    "Data Analytics",
    "Desktop Development",
    "Devops",
    "SQA",
    "Database",
    "Digital Media Marketing",
    "Artificial Intelligence",
    "Blockchain",
    "AWS",
    "Cloud & Web Hosting"
]

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

const SoftwareHouse = () => {
    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2}>
                    <Grid item lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <h1>Software House</h1>
                    </Grid>
                    <Grid item lg={8} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={classes.search_div}>
                            <input type="text" id="search-student" name="search-student" className={classes.search} />
                            <div className={classes.search_icon}>
                                <SearchIcon />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={2} sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'left' }} className={classes.searching}>
                        <h1>Services</h1>
                        <FormGroup>
                            {
                                searchService.map((services, index) => (
                                    <FormControlLabel control={<Checkbox />} label={services} key={index} />
                                ))
                            }
                        </FormGroup>
                    </Grid>
                    <Grid item lg={10} xs={12} >
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
                                        <div>
                                            <h1>10 Pearls</h1>
                                            <p>Karachi, Pakistan</p>
                                        </div>
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
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                                            </p>
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
                                            <p>
                                                {
                                                    searchService && searchService.map((services, i) => (
                                                        <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                }
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item lg={12}>
                                <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div className={classes.software_title}>
                                        <img className={classes.software_image} src={softwareHouse} alt="student" />
                                        <div>
                                            <h1>10 Pearls</h1>
                                            <p>Karachi, Pakistan</p>
                                        </div>
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
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt alias impedit quasi dolorum sed provident ab et illum itaque exercitationem, obcaecati iure vero quisquam earum quo fugiat dicta? Libero, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus earum dolorum explicabo sapiente cum eius nam nemo consequatur inventore. Quam consequuntur quae facere id at voluptate quaerat dignissimos doloribus soluta?
                                            </p>
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
                                            <p>
                                                {
                                                    searchService && searchService.map((services, i) => (
                                                        <Chip label={services} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                }
                                            </p>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SoftwareHouse

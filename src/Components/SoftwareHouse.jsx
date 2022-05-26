import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from "axios";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    Container, Grid, Checkbox, Autocomplete, Box, Accordion, AccordionSummary,
    AccordionDetails, Typography, Chip, MenuItem, TextField, Select, Pagination, CircularProgress, Backdrop
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { searchService } from './getSoftwareHouse';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SoftwareHouse = () => {
    const classes = useStyles();
    const [search, setSearch] = useState(1);

    const searchChange = (event) => {
        setSearch(event.target.value);
    };

    const countPage = async () => {
        const res = await axios.get(`http://localhost:3001/posts`);
        const count = Math.ceil(res.data?.length / 5);
        setCount(count);
    }

    const [posts, setPosts] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");

    const loadPost = async () => {
        await axios.get(`http://localhost:3001/posts?_page=${page}&_limit=5`).then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get(`http://localhost:3001/posts?q=${value}`).then((res) => {
            setPosts(res.data);
            setValue("");
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        countPage();
        loadPost();
        setLoading(true);
        window.scrollTo({ top: 0 });
    }, [page,count])
    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ padding: '0' }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px' }}>
                        <h1>Software House</h1>
                    </Grid>
                    <Grid item lg={12} xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginTop: { lg: 'none', xs: "10px" } }}>
                        <div>
                            {
                                (search === 1) ? (
                                    <Autocomplete
                                        sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
                                        multiple
                                        id="skill-search"
                                        options={searchService}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option}
                                            </li>
                                        )}
                                        style={{ width: { lg: 500, xs: 250 } }}
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                label="Search by Services"
                                                placeholder="Service"
                                                size='medium' />
                                        )}
                                    />
                                ) :
                                    (
                                        <TextField
                                            id="search"
                                            label="Search"
                                            variant="outlined"
                                            size='medium'
                                            value={value}
                                            onChange={(e) => { setValue(e.target.value) }}
                                            sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }} />
                                    )
                            }
                        </div>
                        <Select
                            value={search}
                            onChange={searchChange}
                            displayEmpty
                            sx={{ width: 120, marginRight: '10px' }}
                        >
                            <MenuItem value={1}>Services</MenuItem>
                            <MenuItem value={2}>Name</MenuItem>
                            <MenuItem value={3}>City</MenuItem>
                        </Select>
                        <SearchIcon
                            fontSize='large'
                            onClick={handleSearch}
                            sx={{
                                color: '#42b6EE',
                                cursor: 'pointer',
                                marginTop: { lg: 'none', xs: '10px' },
                            }} />
                    </Grid>
                    <Grid item lg={10} xs={12} >
                        <Grid container spacing={2}>
                            {
                                loading ? (
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                ) : (
                                    posts && posts.map((softwareHouse, index) => (
                                        <Grid item lg={12} >
                                            <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                                <div className={classes.software_title}>
                                                    <div>
                                                        <h1>{softwareHouse.name}</h1>
                                                        <p>{softwareHouse.city}</p>
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
                                                        <p>
                                                            {softwareHouse.about}
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
                                                                softwareHouse.services.map((service, index) => (
                                                                    <Chip label={service} key={index} sx={{ marginRight: '10px', marginBottom: '5px' }} />))
                                                            }
                                                        </p>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Box>
                                        </Grid>
                                    )))
                            }
                        </Grid>
                    </Grid>
                    <Box sx={{ margin: '20px 0px' }}>
                        <Pagination
                            count={count}
                            color="primary"
                            defaultPage={1}
                            onChange={(e, value) => { setPage(value); console.log(loading) }}
                        />
                    </Box>
                </Grid>
            </Container>
        </>
    )
}

export default SoftwareHouse



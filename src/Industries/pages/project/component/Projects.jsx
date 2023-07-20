import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Link,
  Button,
  Backdrop,
  Chip,
  Container,
  CircularProgress,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  Select,
  InputLabel,
  Pagination
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import "../../../../CSS/Utils.css";
import { apiCAll } from '../../../../integration/apiCall';
import PostJob from './PostJob';
import moment from 'moment/moment';

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
    flexDirection: 'column',
    gap: '10px'
    // justifyContent: 'space-between',

  },
  software_image: {
    width: '100px',
    height: '100px'
  },
  logoDateContainer:{
    display: 'flex',
    justifyContent: 'space-between',

  },
  studentImageTag:
  {
    width: '100%',  
    aspectRatio: 1,
    objectPosition: 'center ',
    borderRadius: '10px',
    objectFit: 'none',
  },
  studentImg:{
    img:{
      width: '100px',
      height: '100px'
    }
  }

});



const projectsStatic = [
  {
    id: 1,
    title: 'Tittle of the Project 01',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml','Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml', 'Css', 'HTml'],
        experience: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 02',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 03',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 04',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 05',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 06',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 07',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 08',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 09',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 10',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  },  {
    id: 1,
    title: 'Tittle of the Project 11 ',
    companyLogo: '',
    statement: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    skills: ['CSS', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript', 'HTML', 'JavaScript'],
    description: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    scope: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    deliverables: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    methodology: 'lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor et',
    teamComposition: ["teamComposition", "teamComposition"],
    department: "Software Engineer1",
    contact: "03423446805",
    date: new Date(),
    appliedStudents: [
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",
        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
      {
        studentImage: "http://res.cloudinary.com/dksfpant5/image/upload/v1659803659/IACSImages/student/81.jpg",

        fname: 'Muhammad',
        lname: 'Waqar',
        email: 'waqarshaiikh@gmail.com',
        rollNo: "NED/SE/1203",
        skills: ['Css', 'HTml'],
        experience: 'experience data',
        contact: '03423446805',
        advisorName: 'Advisor Name',
        advisorEmail: 'waqar@gmail.com',
        advisorContact: '03423446805'
      },
    ]
  }, 
]


const ClientJob = () => {
  const classes = useStyles();

  
  const [requestJob, setRequestJob] = useState(false);
  const openRequest = () => setRequestJob(true);
  const closeRequest = () => setRequestJob(false);

  const [showPerPage] = useState(4)
  const [search, setSearch] = useState('title');
  
  const [projects , setProjects  ] = useState(projectsStatic.slice(0, showPerPage));
  const [projectData , setProjectData] = useState(projectsStatic);
  const [projectDataSearch, setProjectDataSearch] = useState(projectsStatic);

  // const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");



  const handleChange = (event) => {
    setSearch(event.target.value);

  };

  // const loadJobs = async (start = 0, end = showPerPage) => {
  //   await apiCAll(`/api/user/job/get`, 'post', { pagination: { starts: start, totalRows: end - start } }).then((res) => {
      
  //     console.log(res?.data);
  //     setJobs(res?.data.data);
  //     setTotal(res?.data.total);
  //     setPostCount(res?.data.total);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  //   setLoading(false);
  // }

  const handleSearch = async () => {

    const searchData  =  projectDataSearch.filter(project => project[search] === value );
    setProjectData(searchData);
    setProjects(searchData.slice(0, showPerPage));



  }

  const searchingTextEmpty = (text) => {

    if (text === "") {
      setProjectData(projectDataSearch);
      setProjects(projectDataSearch.slice(0, showPerPage));
    }
  }

  useEffect(() => {
    // setLoading(true);
    // loadJobs();
  }, [])




  const  addProjects = (project) =>{
    setProjects(prev=>{
      return [project, ...prev];
    });
  }

  const handlePaginationChange = (e, pageNumber)=>{
    const startingIndex = (pageNumber - 1) * showPerPage;
    const endingIndex = startingIndex + showPerPage <= projectData.length ? startingIndex + showPerPage : projectData.length;

    console.log(startingIndex, endingIndex);
    setProjects(projectData.slice(startingIndex, endingIndex));

  }
  return (
    <>
      {/* <ClientNavbar /> */}
      <PostJob open={requestJob} handleClose={closeRequest} setProjects={addProjects} />
      <Container maxWidth="xl" >
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' }, marginTop: '10px'}}>
            <h1>Projects</h1>
          </Grid>
          <Grid item
            lg={12}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: { lg: 'none', xs: "10px" }
            }}>
            <TextField
              id="search"
              label="search"
              variant="outlined"
              size='medium'
              value={value}
              sx={{ marginRight: '10px', width: { lg: 500, xs: 250 } }}
              onChange={(e) => { setValue(e.target.value); searchingTextEmpty(e.target.value); }}
              onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search}
                  label="Search"
                  onChange={handleChange}
                >
                  <MenuItem value={'title'}>Tittle</MenuItem>
                  <MenuItem value={'department'}>Department</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SearchIcon
              fontSize='large'
              onClick={handleSearch}
              sx={{
                color: '#42b6EE',
                cursor: 'pointer',
                marginTop: { lg: 'none', xs: '10px' },
              }} />
          </Grid>



          <Grid item lg={12}>
            <Button variant='contained' sx={{ marginTop: '10px' }} onClick={openRequest}>Post Project</Button>
          </Grid>



          <Grid item lg={10} xs={12} >
            <Grid container spacing={2} >
              {
                loading ?
                  (
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) :
                  ((projects.length === 0) ?
                    (<div className='Post_center'>
                      <h1 className='main_heading'>No Result Found</h1>
                    </div>) :
                    (projects && projects.map((data, index) => (
                      <Grid item lg={12} key={index}>
                      <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <div className={classes.software_title}>
                          <div className={classes.logoDateContainer}>
                            <div className="logo">
                              <img
                                className={classes.software_image}
                                // src={data.companyLogo} 
                                src='https://pakistanplacement-employers.s3.amazonaws.com/149146986110p%20Logo%203.png'
                                alt="companyLogo" />
                            </div>
                            <Typography sx={{ display: 'block', color: '#d3d3d3' }}>
                              {moment(data?.date).format('DD MMM YYYY')}
                            </Typography>
                          </div>


                          <Box>
                            <Box sx={{marginTop: '20px'}}>
                              <Typography variant='h5' sx={{display: 'inline', fontWeight: 'bold'}} >{data.title}</Typography>
                              {/* <Typography  sx={{display: 'inline', marginLeft: '10px'}}>{data.title}</Typography> */}
                            </Box>

                            <Typography  sx={{marginTop: '20px'}} variant='h6' >{"Project Statement"}</Typography>
                            <Typography>{data.statement}</Typography>
                            <Box sx={{ marginTop: '20px', marginBottom: '10px'}}>
                            <Typography variant='h6' sx={{display: 'inline', marginTop: '20px'}}>{"Skills"} </Typography>

                            <Typography  sx={{display: 'inline', marginLeft: '10px'}}>
                              {
                                data.skills && data.skills.map((skill, i) => (
                                  <Chip label={skill} color= 'primary' sx={{ marginRight: '10px', marginBottom: '5px',height: '20px !important', borderRadius: '3px !important' }} />))
                                }
                            </Typography>
                            </Box>

                          </Box>



                        </div>

                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="Detail"
                          >
                            <Typography>Details</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography variant='h6' sx={{marginTop: '20px'}}> {"Description"} </Typography>
                            <Typography> {data.description} </Typography>
                            <Typography variant='h6' sx={{marginTop: '20px'}}> {"Scope"} </Typography>
                            <Typography> {data.scope} </Typography>
                            <Typography variant='h6' sx={{marginTop: '20px'}}> {"Deliverables"} </Typography>
                            <Typography> {data.deliverables} </Typography>
                            <Typography  variant='h6' sx={{marginTop: '20px'}}> {"Methodology"} </Typography>
                            <Typography> {data.methodology} </Typography>
                            <Typography  variant='h6' sx={{marginTop: '20px'}}> {"Team Composition"} </Typography>
                            <Typography  >
                              {
                                data.teamComposition && data.teamComposition.map((person, i) => (
                                  <Chip label={person} color="primary" 
                                  sx={{ marginRight: '10px', marginBottom: '5px',height: '20px !important', borderRadius: '3px !important' }} 
                                   key={i} />))
                              }
                            </Typography>
                            <Box sx={{marginTop: '20px'}}>
                              <Typography variant='h6' sx={{display: 'inline'}}> {"Department"} </Typography>
                              <Typography sx={{display: 'inline'}}> {data.department} </Typography>
                            </Box>
                            <Box sx={{marginTop: '20px'}}>

                            <Typography variant='h6' sx={{display: 'inline', marginRight: '10px'}}> {"Contact "} </Typography>
                            <Typography sx={{display: 'inline'}}> {data.contact} </Typography>
                            </Box>


                          </AccordionDetails>
                        </Accordion>



                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Applications"
                            >
                              <Typography>Applications</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                
                              {/*
                                Students Applications List
                               */}
                              <Grid container spacing={2} >
                                {
                                  data.appliedStudents && data.appliedStudents.map((data, index) => (
                                    <Grid item lg={12} sm={12} key={index}>
                                      <Box sx={{ borderRadius: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                        <div className={classes.software_title}>
                                          
                                          
                                          <Grid container spacing={2}>
                                            <Grid item className={classes.studentImg}  >
                                              <img
                                                className={classes.studentImageTag}
                                                src={data.studentImage}
                                                alt="studentImage" />
                                            </Grid>
                                            <Grid item xs={9} className="studentDetail">
                                              <Typography variant='h5' sx={{textTransform:  'uppercase', fontWeight: '500',}}>{data.fname + " " + data.lname}</Typography>
                                              
                                              <Typography color= '#0085c6'>{data.email}</Typography>
                                              <Typography>{data.rollNo}</Typography>                                            
                                              <Typography variant='p' sx={{display: 'inline', marginTop: '20px', fontWeight: '500', textTransform: 'uppercase'}}>{"Skills :"}</Typography>
                                              <Typography  sx={{display: 'inline', marginLeft: '10px'}}>
                                                {
                                                  data.skills && data.skills.map((skill, i) => (
                                                    <Chip label={skill } color= 'primary'
                                                    key={i}
                                                    sx={{ marginRight: '10px', marginBottom: '5px' ,height: '20px !important', borderRadius: '3px !important'}} />))
                                                  }
                                              </Typography>
                                            </Grid>

                                          </Grid>


                                          <div>
                                            
                                            <Typography variant='h6'>{"Experience"}</Typography>
                                            <Typography>{data.experience}</Typography>
                                            <Box sx={{display: 'flex', alignItems: 'baseline', gap: "20px"}}>
                                              <Typography variant='h6' >{"Contact :"}</Typography>
                                              <Typography color='#0085c6'>{data.contact}</Typography>
                                            </Box>

                                            <Typography variant='h5' sx={{margin: '20px 0', textTransform: 'uppercase', fontWeight: '500'}} >{"Advisor Detail"}</Typography>

                                            <Box sx={{display: 'flex', alignItems: 'baseline', gap: "20px"}}>
                                              <Typography variant='h6'> Name : </Typography>
                                              <Typography sx={{fontWeight:'500', textTransform: 'uppercase'}}> {data.advisorName}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', alignItems: 'baseline', gap: "20px"}}>
                                              <Typography variant='h6'> Email :</Typography>
                                              <Typography color='#0085c6'> {data.advisorEmail}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', alignItems: 'baseline', gap: "20px"}}>
                                              <Typography variant='h6'> Contact No :</Typography>
                                              <Typography color='#0085c6'> {data.advisorContact}</Typography>
                                            </Box>
                                        


                                          </div>
                                        </div>
                                      </Box>
                                    </Grid>
                                  ))
                                }
                              </Grid>
                              

                            </AccordionDetails>
                          </Accordion>

                        </Box>
                      </Grid>
                    ))
                    ))
              }

            </Grid>
          </Grid>
          <Box sx={{ margin: '20px 0px' }}>
            <Pagination 
            count={Math.ceil(projectData.length / showPerPage) }
            shape='rounded'
            onChange={handlePaginationChange}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default ClientJob

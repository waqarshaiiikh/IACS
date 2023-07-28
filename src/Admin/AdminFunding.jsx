import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { makeStyles, styled, useTheme } from '@mui/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import useFetchData from '../Hook/useFetchData';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MetaData from '../MetaData';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: '90% !important',
    margin: '30px auto'
  },
  tablePagination:{
    width: '90% !important',
    margin: '30px auto',
    '& > div p':{
      marginBottom: '0px'
    }
  }
});



const rows = [
  {
    name: 'Muhammad Waqar'
    , department: 'Software Engineer'
    , email: 'waqarshaiikh@gmail.com'
    , contact: '03423446805'
    , enrollment: 'NED/1481/2018'
    , projectTitle: 'Project Title'
    , amount: '1500/RS'
    , supervisorName: 'Wahab'
    , detail: 'Funding 01'
  }
];



const Funding = (props) => {

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataPerPage, setDataPerPage] = useState([]);


  const {
    loading: fundingProposalLoading,
    error: fundingProposalError,
    data: fundingProposalData,
    fetchData: getFundingProposal } = useFetchData();

  useEffect(() => {
    getFundingProposal("/funding/approved").then(res=>{
      setDataPerPage(res.slice(0, rowsPerPage))
    })
  }, [])
  // useEffect(() => {
  //   getFundingProposal("/funding/approved").then(res => {
  //     // Calculate the starting and ending index for the current page
  //     const startingIndex = page * rowsPerPage;
  //     const endingIndex = startingIndex + rowsPerPage;
  
  //     // Slice the data based on the current page and rowsPerPage
  //     setDataPerPage(res.slice(startingIndex, endingIndex));
  //   });
  // }, [getFundingProposal, page, rowsPerPage]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage)
    const startingIndex = (newPage) * rowsPerPage;
    const endingIndex = startingIndex + rowsPerPage <= fundingProposalData.length ? startingIndex + rowsPerPage : fundingProposalData.length;
    setDataPerPage(fundingProposalData.slice(startingIndex, endingIndex));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setDataPerPage(fundingProposalData.slice(0, parseInt(event.target.value, 10)));
    setPage(0);
  };



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={props.className}>
      <MetaData title="Funding List" />
      <AdminNavbar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        theme={theme}
      />
      <div className='Funding'>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Contact</TableCell>
                <TableCell align="right">Enrollment</TableCell>
                <TableCell align="right">Apply Date</TableCell>
                <TableCell align="right">Project Title</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Supervisor Name</TableCell>
                <TableCell align="right">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPerPage && dataPerPage.map(({
                id,
                studentName,
                studentDepartment,
                studentEmail,
                studentContact,
                appliedDate,
                studentRollNumber,
                projectTitle,
                projectAmount,
                supervisorName
              }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row"> {studentName} </TableCell>
                  <TableCell align="right">{studentDepartment}</TableCell>
                  <TableCell align="right">{studentEmail}</TableCell>
                  <TableCell align="right">{studentContact}</TableCell>
                  <TableCell align="right">{studentRollNumber}</TableCell>
                  <TableCell align="right">{moment(new Date(appliedDate)).format('DD  MMM  YYYY')}</TableCell>
                  <TableCell align="right">{projectTitle}</TableCell>
                  <TableCell align="right">{projectAmount}</TableCell>
                  <TableCell align="right">{supervisorName}</TableCell>
                  <TableCell align="right"><Link to={`/admin/Funding/${id}`} style={{
                    color: '#42b6EE',
                  }}>View</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.tablePagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={fundingProposalData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </div>
    </div>
  )
}


const FundingStyle = styled(Funding)(() => ({

  '& .Funding':{
    marginTop: '100px',
  }


}))

export default FundingStyle



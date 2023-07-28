import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent,
         DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from '@mui/material';
import SupervisorNavbar from './SupervisorNavbar';
import useFetchData from '../../../../Hook/useFetchData';

const Grid = (props) => {

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(${props.columns || 12}, 1fr);
        row-gap: ${props.rowGap || props.gap || '1rem'};
        column-gap: ${props.columnGap || props.gap || '1rem'};
        `;

    const GridItem = styled.div`
          grid-column: span ${props.span || 1};
          ${props.spanNewRow && `
            & {
                grid-column: 1/ ${props.spanNewRow + 1};
            }
          `}
          ${props.center && `
            & {
                display: flex;
                justify-content: center;
            }
          `}
          

        `;

    return (props.container ? <GridContainer {...props} >{props.children}</GridContainer> : <GridItem {...props} >{props.children}</GridItem>)
}


const FundingApproval = ({
    className,
    data,
    getFundingProposal,
    fundingProposalLoading,
    fundingProposalError
}) => {
    const {  
    id,
    studentName,
    studentEmail,
    studentRollNumber,
    studentContact,
    studentDepartment,
    projectTitle,
    projectDescription ,
    projectDuration ,
    projectAmount,
    amountJustification ,
    amountBreakdown ,
    supervisorName,
    supervisorEmail ,
    supervisorDepartment,
    } = data;


    const [openDialog, setOpenDialog] = useState(false);
    const [status, setStatus] = useState();
 
    // const theme = useTheme();

    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (status) => {
        setOpenDialog(true);
        setStatus(status);
    };

    const changeStatus = () => {
        getFundingProposal(`/funding/update_status?fundingId=${id}&status=${status}`);
    }

    const handleClose = (update) => {
        setOpenDialog(false);
        if(update)
            changeStatus();
    };

    return (
        <div className={className}>
            <SupervisorNavbar />

            <Grid container={true} className='funding' rowGap={'10px'}>

                <Grid spanNewRow={12} className='alert' >
                    <Dialog
                        // fullScreen={fullScreen}
                        open={openDialog}
                        onClose={()=>{handleClose(false)}}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {`Confirmation` }
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            {`Are you sure you want to ${'Approved'} this Funding Request?` }
                                {/* Let Google help apps determine location. This means sending anonymous */}
                                {/* location data to Google, even when no apps are running. */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={()=>{handleClose(true)}}>
                                YES
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid span={12} center={true}><h2 className='information'>Funding Information</h2></Grid>

                <Grid spanNewRow={12} className='buttons'>
                    <Button variant='contained' onClick={()=>{handleClickOpen('approved')}} disabled={fundingProposalLoading}> Approved </Button>
                    <Button variant='contained' color='error' onClick={()=>{handleClickOpen('rejected')}}  disabled={fundingProposalLoading}> Reject </Button>
                </Grid>
                {fundingProposalError && <Grid spanNewRow={12} className='buttons'>
                    <Typography>Server Busy</Typography>
                </Grid>}


                <Grid spanNewRow={12}><h3 className='subMainHeading'>Student Detail</h3></Grid>

                <Grid span={3}><h4 className='subHeading'>Name </h4></Grid>
                <Grid span={9}><p>{studentName}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Email </h4></Grid>
                <Grid span={9}><p>{studentEmail}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Roll Number </h4></Grid>
                <Grid span={9}><p>{studentRollNumber}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Contact  </h4></Grid>
                <Grid span={9}><p>{studentContact}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Department  </h4></Grid>
                <Grid span={9}><p>{studentDepartment}</p></Grid>

                <Grid spanNewRow={12}><h3 className='subMainHeading'>Project Detail</h3></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Title  </h4></Grid>
                <Grid span={9}><p>{projectTitle}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Duration  </h4></Grid>
                <Grid span={9}><p>{projectDuration}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Amount  </h4></Grid>
                <Grid span={9}><p>{projectAmount}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'> Project Description  </h4></Grid>
                <Grid span={12}><p>{projectDescription}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'>Amount Justification  </h4></Grid>
                <Grid span={12}><p>{amountJustification}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'>Budget BreakDown  </h4></Grid>
                <Grid span={12}><p>{amountBreakdown}</p></Grid>

                <Grid spanNewRow={12}><h3 className='subMainHeading'>Supervisor Detail</h3></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Name </h4></Grid>
                <Grid span={9}><p>{supervisorName}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Email </h4></Grid>
                <Grid span={9}><p>{supervisorEmail}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Department </h4></Grid>
                <Grid span={9}><p>{supervisorDepartment}</p></Grid>



            </Grid>
        </div>
    )
}

const FundingApprovalStyle = styled(FundingApproval)(() => ({
    '& .funding ': {
        width: '90%',
        margin: '20px auto 50px auto',
        '& .information, & .subMainHeading': {
            opacity: .85,
            margin: '20px 0px 40px 0px'
        },
        '& .subHeading': {
            // margin: '20px 0px',
            opacity: .75
        },
        '& .full__width': {
            marginTop: '20px',
        },
        '& .buttons': {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px'
        }
    }
}))

export default FundingApprovalStyle;
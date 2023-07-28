import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import { useTheme } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';
import useFetchData from '../Hook/useFetchData';
import { Typography } from '@mui/material';
import MetaData from '../MetaData';

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

const AdminFundingDetail = ({className}) => {

    const { hashId } = useParams();
    const {
        data: fundingProposalData,
        fetchData: getFundingProposal } = useFetchData();

    useEffect(() => {
        getFundingProposal("/funding/specific?fundingId=" + hashId);
    }, [])


    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const theme = useTheme();

    return (
        <div className={className}>
            <MetaData title="Funding Request" />

            <AdminNavbar
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                theme={theme}
            />

            {fundingProposalData && <Grid container={true} className='funding' rowGap={'10px'}>
                <Grid span={12} center={true}><h2 className='information'>Funding Information</h2></Grid>
                <Grid spanNewRow={12}  center={true}>
                    <Link to="/admin/Funding" className='link_color'>
                       <Typography >
                         {'FUNDING LIST'}
                        </Typography>
                    </Link>
                </Grid>

                <Grid spanNewRow={12}><h3 className='subMainHeading'>Student Detail</h3></Grid>

                <Grid span={3}><h4 className='subHeading'>Name </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.studentName}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Email </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.studentEmail}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Roll Number </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.studentRollNumber}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Contact  </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.studentContact}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Department  </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.studentDepartment}</p></Grid>

                <Grid spanNewRow={12}><h3 className='subMainHeading'>Project Detail</h3></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Title  </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.projectTitle}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Duration  </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.projectDuration}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Amount  </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.projectAmount}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'> Project Description  </h4></Grid>
                <Grid span={12}><p>{fundingProposalData.projectDescription}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'>Amount Justification  </h4></Grid>
                <Grid span={12}><p>{fundingProposalData.amountJustification}</p></Grid>

                <Grid spanNewRow={12}><h4 className='subHeading full__width'>Budget BreakDown  </h4></Grid>
                <Grid span={12}><p>{fundingProposalData.amountBreakdown}</p></Grid>

                <Grid spanNewRow={12}><h3 className='subMainHeading'>Supervisor Detail</h3></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Name </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.supervisorName}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Email </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.supervisorEmail}</p></Grid>

                <Grid spanNewRow={3}><h4 className='subHeading'>Department </h4></Grid>
                <Grid span={9}><p>{fundingProposalData.supervisorDepartment}</p></Grid>

            </Grid>}
        </div>
    )
}

const AdminFundingDetailStyled = styled(AdminFundingDetail)(() => ({
    '& .funding ': {
        width: '90%',
        margin: '100px auto',

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
        '& .link_color':{
            color: '#42b6EE',
            background: 'aliceblue',
            padding: '5px',
            borderRadius:'5px'
        }
    }
}))

export default AdminFundingDetailStyled
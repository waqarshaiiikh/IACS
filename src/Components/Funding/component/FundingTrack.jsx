import React from 'react'
import { styled } from 'styled-components'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';


//  #1e7e34c9 // color of circle
//  #ee8c42   // color of circle warning
const Grid = (props) => {

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(${props.columns || 12}, 1fr);
        gap: ${props.gap || '1rem'};
        `;

    const GridItem = styled.div`
          grid-column: span ${props.span || 1};
        `;

    return (props.container ? <GridContainer {...props} >{props.children}</GridContainer> : <GridItem {...props} >{props.children}</GridItem>)

}

const VerticalLine = styled.div(()=>({
    '& ':{
        height: '15vh',
        'div':{
            borderLeft: '1px solid grey',
            opacity: .4,
            width: '0.5px',
            height: '100%',
        }
    }

}));

const FundingTrack = ({className, data}) => {
    

    return (
        <div className={className}>
            <div className='funding__tracking' >
                <div item className='heading' >
                    <h4 > Funding Status </h4>
                </div>

                <Grid container={true} className='tracking__container'>

                    <Grid item={true} span={5} className='track__content' >
                        <div className='status__data-left  status__data'>
                            <h3 style={{ width: '100%' }}> Application Submitted </h3>
                            <p>Dear student, your application is now under review by the supervisor. They will carefully assess your funding proposal, budget, and team's capability for the project.</p>
                        </div>
                    </Grid>

                    <Grid item={true} span={2} className='track__circle'
                        style={{ opacity: data.status === 'sent' || data.status === 'approved' ? 1: .5 }}
                        >
                        {data.status === 'sent' || data.status === 'approved' ? <TaskAltOutlinedIcon /> : <PendingOutlinedIcon />}
                    </Grid>

                    <Grid item={true} span={5} className='track__circle' >
                    </Grid>


                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                    <Grid item={true} span={2} className='track__line'>
                        <VerticalLine><div className='line__div'></div></VerticalLine>
                    </Grid>

                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                    <Grid item={true} 
                        span={2} 
                        className='track__circle'
                        style={{ opacity: data.status === 'approved' ? 1: .5 }}
                        >
                        {data.status === 'approved' ? <TaskAltOutlinedIcon /> : <PendingOutlinedIcon />}
                    </Grid>
                    

                    <Grid item={true} span={5} className='track__content track__content-right'
                        style={{ opacity: data.status === 'approved' ? 1: .5 }}
                    >
                        <div className='status__data-right status__data'>
                            <h3 style={{ width: '100%' }}> Supervisor Approved Your Application </h3>
                            <p>Your request has been approved by the supervisor. Congratulations! </p>
                        </div>
                    </Grid>

                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                    <Grid item={true} span={2} className='track__line'>
                        <VerticalLine><div className='line__div'></div></VerticalLine>
                    </Grid>
                    
                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                    <Grid item={true} span={5} className='track__content' 
                        style={{ opacity: data.status === 'approved' ? 1: .5 }}
                        >
                        <div className='status__data-left status__data'>
                            <h3 style={{ width: '100%' }}>  DIL Supervision </h3>
                            <p>Dear student, your application is now under review by the DIL Department.</p>
                        </div>
                    </Grid>

                    <Grid item={true}
                        span={2}
                        className='track__circle'
                        style={{ opacity: data.status === 'approved' ? 1: .5 }}
                    >
                        {data.status === 'approved'  ? <TaskAltOutlinedIcon /> : <PendingOutlinedIcon />}
                    </Grid>


                    <Grid item={true} span={5} className='track__line'>
                    </Grid>

                </Grid>

            </div>
        </div>
    )
}

const TrackingStyle = styled(FundingTrack)(() => ({
    '& .heading': {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
        opacity: .75

    },
    '& .tracking__container': {
        margin: '30px 5% !important',
        '& .track__line , & .track__circle': {
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            '& svg': {
                width: '100px',
                height: '100px',
                color: '#42b6EE'
            },
        }
    },
    '& .status__data':{
        width: '60%',
        p: {
         textAlign:'justify',
         opacity: .6
        },
        h3:{
            opacity: .75
        }

    },
    '& .status__data-left':{
        textAlign: 'right',
        textDecoration: 'justify'
        // paddingLeft: '20px'
    },
    '& .status__data-right':{
        paddingRight: '20px'
    },
    '& .track__content':{
        display:'flex',
        justifyContent: 'end',
    },
    '& .track__content-right':{
        justifyContent: 'start'
    },



}))

export default TrackingStyle
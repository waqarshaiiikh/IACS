import { styled } from 'styled-components';
import React from 'react'
import SupervisorNavbar from './SupervisorNavbar';

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

const RequestSubmitted = ({className, studentName = 'unknown', status='none'}) => {
  return (
    <div className={className}>

    <SupervisorNavbar/>
    <div  className='status__container' >
        <div className='status_content'>
            <p> We are pleased to inform you that<strong>  [{studentName}]'s  </strong>funding request has been <strong> {status} </strong> . Your support is appreciated.</p>
        </div>
    </div>
    </div>
  )
}

const RequestSubmittedStyled = styled(RequestSubmitted)(()=>({
    
    '& .status__container ':{
        margin: '10% auto 0 auto',
        justifyItems: 'center',
        '& .status_content':{
            margin:'auto 20%'
        },
        p:{
            opacity: .70,
            fontSize: '2rem'
            // width: '50%',
            // textAlign: 'center',
        }
        
    }

}));

export default RequestSubmittedStyled
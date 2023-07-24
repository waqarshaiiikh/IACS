import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundStyle = {
  NotFoundContainer: {

    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  NotFoundText:{
    color: 'DarkGrey'
  },
  BackText: {
    color: '#007bff'
  }

}

const NotFound = () => (
  <div style={{
    ...NotFoundStyle.NotFoundContainer
  }}>
    <h1 style={{...NotFoundStyle.NotFoundText}} >404 - Not Found!</h1>
    <Link  style={{...NotFoundStyle.BackText}} to="/">Go Home</Link>
  </div>
);

export default NotFound;
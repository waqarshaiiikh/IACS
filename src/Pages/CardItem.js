import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';

function CardItem({image, service, description}) {
  return (
    <>
      <Card sx={{lg:{width:'auto', background:'purpule'}, sm:{width:350}}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="service"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default CardItem;

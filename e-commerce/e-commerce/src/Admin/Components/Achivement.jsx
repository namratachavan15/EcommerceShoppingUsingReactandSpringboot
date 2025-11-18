import { Button, Card, CardContent, Typography, styled } from '@mui/material';
import React from 'react';
import TrophyImage from '../../assests/tropy.png';

const TriangleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
});

const TropyImg = styled("img")({
    right: 5,
    bottom: 20,
    height: 80,
    position: 'absolute'
});

const Achivement = () => {
  return (
    <Card
      sx={{
        position: "relative",
        width: '100%', // full width on small screens
        maxWidth: 394, // max width for larger screens
        m: 'auto'
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop with E-commerce
        </Typography>
        <Typography variant="body2">Congratulation 🥳</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>420.8k</Typography>
        <Button size="small" variant="contained">View Sales</Button>
        <TriangleImg src="" />
        <TropyImg src={TrophyImage} sx={{ width: { xs: 40, sm: 60 }, ml: { xs: 2, sm: 5 } }} />
      </CardContent>
    </Card>
  );
};

export default Achivement;

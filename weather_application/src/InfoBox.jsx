import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import "./InfoBox.css";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://images.unsplash.com/photo-1673191898695-8252d409d82c?q=80&w=1170&auto=format&fit=crop";
  const HOT_URL =
    "https://images.unsplash.com/photo-1581129724980-2ab2153c3d8d?q=80&w=1170&auto=format&fit=crop";
  const COLD_URL =
    "https://images.unsplash.com/photo-1476400424721-e25994a9f0ff?q=80&w=1347&auto=format&fit=crop";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&auto=format&fit=crop&q=60";

  // Decide background image
  const getImageUrl = () => {
    if (!info || !info.temp) return INIT_URL;
    if (info.humidity > 80) return RAIN_URL;
    if (info.temp > 15) return HOT_URL;
    return COLD_URL;
  };

  // Decide weather icon
  const getWeatherIcon = () => {
    
    if (info.humidity > 80) return <ThunderstormIcon />;
    if (info.temp > 15) return <WbSunnyIcon />;
    return <AcUnitIcon />;
  };

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={getImageUrl()}
            title="Weather Preview"
          />
          <CardContent>
            {info ? (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  {info.city} {getWeatherIcon()}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <div>Temperature = {info.temp}&deg;C</div>
                  <div>Humidity = {info.humidity}</div>
                  <div>Minimum Temperature = {info.tempMin}&deg;C</div>
                  <div>Maximum Temperature = {info.tempMax}&deg;C</div>
                  <div>
                    The Weather can be described as <b>{info.weather}</b> feels
                    like = <b>{info.feelsLike}&deg;C</b>
                  </div>
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Enter a city to see weather info.
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

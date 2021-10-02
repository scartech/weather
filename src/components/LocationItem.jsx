import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Grid,
  Snackbar,
  Alert,
  Skeleton,
  Stack,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';
import { toDate } from 'date-fns-tz';
import axios from 'axios';
import zip from 'zippo';

const Item = styled(Paper)(({ theme }) => ({
  fontSize: '14px',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
  margin: 'auto',
}));

const WeatherItem = styled(Paper)(({ theme }) => ({
  fontSize: '15px',
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};

const metersPerSecToMPH = (ms) => {
  return Math.round(ms * 2.24);
};

const padValue = (value) => {
  return padLeft(value + 1);
};

const padLeft = (value) => {
  const text = value.toString();
  return text.length > 1 ? text : `0${text}`;
};

const toLocalDate = (value) => {
  const utcDate = toDate(`${value}+00:00`);
  return formatDistanceToNow(utcDate, { addSuffix: true });
};

const adjustHours = (value) => {
  const now = new Date();
  const utcDate = toDate(
    `${now.getFullYear()}-${padValue(now.getMonth())}-${padLeft(
      now.getDate(),
    )}T${value}:00+00:00`,
  );

  return `${padLeft(utcDate.getHours())}:${padLeft(utcDate.getMinutes())}`;
};

const apiBaseUrl = 'https://api.weatherbit.io/v2.0/current';
const imageBaseUrl = 'https://www.weatherbit.io/static/img/icons/';

function LocationItem({ apiKey, location, handleDelete }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [city, setCity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [observationTime, setObservationTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateWeather = async () => {
      try {
        let url = `${apiBaseUrl}?key=${apiKey}&`;

        if (zip.validate(location)) {
          url += `postal_code=${location}`;
        } else {
          const locationValue = encodeURIComponent(location);
          url += `city=${locationValue}`;
        }

        const res = await axios.get(url);
        const data = res?.data?.data?.[0];
        if (data) {
          setImageUrl(`${imageBaseUrl}/${data?.weather?.icon}.png`);
          setDescription(data?.weather?.description);

          setTemperature(`${celsiusToFahrenheit(data.temp)}\xB0F`);
          setFeelsLike(`${celsiusToFahrenheit(data.app_temp)}\xB0F`);
          setHumidity(`${data.rh}%`);
          setSunrise(adjustHours(data.sunrise));
          setSunset(adjustHours(data.sunset));
          setWindSpeed(`${metersPerSecToMPH(data.wind_spd)} MPH`);
          setObservationTime(`${toLocalDate(data.ob_time)}`);
          setCity(data.city_name);
        } else {
          setSnackbarMessage(`Unable to get weather data for ${location}`);
          setOpenSnackbar(true);
        }
      } catch {
        setSnackbarMessage(`Unable to get weather data for ${location}`);
        setOpenSnackbar(true);
      }

      setLoading(false);
    };

    updateWeather();
  }, [apiKey, location]);

  const handleSnackClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Item elevation={6}>
        <Typography variant="h3">
          {location}
          <IconButton onClick={() => handleDelete(location)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Typography>
        {loading ? (
          <>
            <Stack spacing={1}>
              <Grid container justifyContent="center">
                <Grid item md={12}>
                  <Skeleton
                    variant="circular"
                    height={80}
                    width={80}
                    sx={{ margin: 'auto' }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item md={12}>
                  <Skeleton
                    variant="rectangular"
                    height={50}
                    sx={{ margin: 'auto' }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item md={12}>
                  <Skeleton
                    variant="rectangular"
                    height={85}
                    sx={{ margin: 'auto' }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </>
        ) : (
          <>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {city}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item md={12}>
                <Avatar
                  alt={description}
                  src={imageUrl}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: 'auto',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h5">{description}</Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {observationTime}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>
                  Current temp: {temperature}
                </WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Feels like: {feelsLike}</WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Humidity: {humidity}</WeatherItem>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Sunrise: {sunrise}</WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Sunset: {sunset}</WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Wind: {windSpeed}</WeatherItem>
              </Grid>
            </Grid>
          </>
        )}
      </Item>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        action={
          <>
            <IconButton size="small" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleSnackClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LocationItem;

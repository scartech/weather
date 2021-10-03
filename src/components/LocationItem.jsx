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
import { formatDistanceToNow, format, parse } from 'date-fns';
import { toDate } from 'date-fns-tz';
import PropTypes from 'prop-types';
import axios from 'axios';
import zip from 'zippo';
import ForecastItem from './ForecastItem';

const Item = styled(Paper)(({ theme }) => ({
  fontSize: '10px',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
  margin: 'auto',
}));

const WeatherItem = styled(Paper)(({ theme }) => ({
  fontSize: '10px',
  padding: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const padLeft = (value) => {
  const text = value.toString();
  return text.length > 1 ? text : `0${text}`;
};

const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

const metersPerSecToMPH = (ms) => Math.round(ms * 2.24);

const padValue = (value) => padLeft(value + 1);

const toLocalDate = (value) => {
  const utcDate = toDate(`${value}+00:00`);
  return formatDistanceToNow(utcDate, { addSuffix: true });
};

const toDayOfWeek = (value) => {
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return format(date, 'EEEE');
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

const currentApiBaseUrl = 'https://api.weatherbit.io/v2.0/current';
const forecastApiBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
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
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const updateForecast = async () => {
      try {
        let url = `${forecastApiBaseUrl}?key=${apiKey}&units=I&days=4&`;

        if (zip.validate(location)) {
          url += `postal_code=${location}`;
        } else {
          const locationValue = encodeURIComponent(location);
          url += `city=${locationValue}`;
        }

        const res = await axios.get(url);
        const data = res?.data?.data;
        if (data) {
          const values = data.map((day) => {
            const val = {
              forecastDate: toDayOfWeek(day?.valid_date),
              highTemp: `${Math.round(day?.high_temp)}\xB0`,
              lowTemp: `${Math.round(day?.low_temp)}\xB0`,
              imageUrl: `${imageBaseUrl}/${day?.weather?.icon}.png`,
              description: day?.weather?.description,
              rainChance: `${Math.round(day?.pop)}%`,
            };

            return val;
          });

          setForecast(values);
        } else {
          setSnackbarMessage(`Unable to get weather forecast for ${location}`);
          setOpenSnackbar(true);
        }
      } catch {
        setSnackbarMessage(`Unable to get weather forecast for ${location}`);
        setOpenSnackbar(true);
      }

      setLoading(false);
    };

    const updateWeather = async () => {
      try {
        let url = `${currentApiBaseUrl}?key=${apiKey}&`;

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

          setTemperature(`${celsiusToFahrenheit(data.temp)}\xB0`);
          setFeelsLike(`${celsiusToFahrenheit(data.app_temp)}\xB0`);
          setHumidity(`${Math.round(data.rh)}%`);
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

      updateForecast();
    };

    updateWeather();
  }, [apiKey, location]);

  const handleSnackClose = () => {
    setOpenSnackbar(false);
  };

  return (
    /* eslint-disable react/jsx-one-expression-per-line */
    <>
      <Item elevation={6}>
        <Typography variant="h5">
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
                    height={60}
                    width={60}
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
                    width: 60,
                    height: 60,
                    margin: 'auto',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h6">{description}</Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {observationTime}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Current: {temperature}</WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Feels like: {feelsLike}</WeatherItem>
              </Grid>
              <Grid item xs={4}>
                <WeatherItem elevation={0}>Humidity: {humidity}</WeatherItem>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
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
            <Grid container>
              {forecast.map((f) => (
                <ForecastItem key={f.forecastDate} {...f} />
              ))}
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
    /* eslint-enable react/jsx-one-expression-per-line */
  );
}

LocationItem.propTypes = {
  apiKey: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default LocationItem;

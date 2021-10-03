import { Avatar, Paper, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
  fontSize: '8px',
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ForecastItem({
  imageUrl,
  description,
  forecastDate,
  lowTemp,
  highTemp,
  rainChance,
}) {
  return (
    /* eslint-disable react/jsx-one-expression-per-line */
    <>
      <Grid item xs={3}>
        <Item elevation={0}>
          <Grid container justifyContent="center">
            <Typography variant="caption" fontWeight="bold">
              {forecastDate}
            </Typography>
          </Grid>
          <Avatar
            alt={description}
            src={imageUrl}
            sx={{
              width: 20,
              height: 20,
              margin: 'auto',
            }}
          />
          <Grid container justifyContent="center">
            <Typography variant="caption">{description}</Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="caption">
              H: {highTemp} L: {lowTemp} Rain: {rainChance}
            </Typography>
          </Grid>
        </Item>
      </Grid>
    </>
    /* eslint-enable react/jsx-one-expression-per-line */
  );
}

ForecastItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  forecastDate: PropTypes.string.isRequired,
  lowTemp: PropTypes.string.isRequired,
  highTemp: PropTypes.string.isRequired,
  rainChance: PropTypes.string.isRequired,
};

export default ForecastItem;

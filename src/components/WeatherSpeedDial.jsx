import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import CloudIcon from '@mui/icons-material/Cloud';
import PropTypes from 'prop-types';

const actions = [
  {
    icon: <AddIcon />,
    tooltip: 'Add New Location',
    op: 'ADD',
  },
  {
    icon: <CloudIcon />,
    tooltip: 'Update Weatherbit Key',
    op: 'UPDATE_KEY',
  },
];

function WeatherSpeedDial({ handleClick }) {
  return (
    <div>
      <SpeedDial
        ariaLabel="Weather Menu"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<SettingsIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.op}
            icon={action.icon}
            tooltipTitle={action.tooltip}
            onClick={() => handleClick(action.op)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

WeatherSpeedDial.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default WeatherSpeedDial;

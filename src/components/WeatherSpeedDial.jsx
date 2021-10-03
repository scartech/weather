import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PropTypes from 'prop-types';

const actions = [
  {
    icon: <AddIcon />,
    tooltip: 'Add Location',
    op: 'ADD',
  },
  {
    icon: <VpnKeyIcon />,
    tooltip: 'API Key',
    op: 'UPDATE_KEY',
  },
];

function WeatherSpeedDial({ handleClick }) {
  return (
    <div>
      <SpeedDial
        ariaLabel="Weather Menu"
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
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

import { useState, useEffect } from 'react';
import { Stack, Container } from '@mui/material';
import {
  WeatherSpeedDial,
  KeyDialog,
  AddDialog,
  DeleteDialog,
  LocationItem,
} from './components';

function App() {
  const [apiKey, setApiKey] = useState(() => {
    const initialValue = localStorage.getItem('apiKey');
    return initialValue || '';
  });

  const [locations, setLocations] = useState(() => {
    const initialValue = JSON.parse(localStorage.getItem('weatherLocations'));
    return initialValue || [];
  });

  const [keyDialogOpen, setKeyDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLocation, setDeleteLocation] = useState('');

  const handleSpeedDialClick = (op) => {
    switch (op) {
      case 'ADD':
        setAddDialogOpen(true);
        break;
      case 'UPDATE_KEY':
        setKeyDialogOpen(true);
        break;
      default:
        break;
    }
  };

  const handleKeyDialogCancel = () => {
    setKeyDialogOpen(false);
  };

  const handleAddDialogCancel = () => {
    setAddDialogOpen(false);
  };

  const handleAddDialogOK = (value) => {
    setAddDialogOpen(false);
    setLocations([...locations, value]);
  };

  const handleKeyDialogOK = (value) => {
    setKeyDialogOpen(false);
    setApiKey(value);
    setAddDialogOpen(value && locations.length === 0);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteOK = (location) => {
    setDeleteDialogOpen(false);
    setLocations(locations.filter((l) => l !== location));
  };

  const handleDelete = (location) => {
    setDeleteLocation(location);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('weatherLocations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('apiKey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    setKeyDialogOpen(!apiKey);
    setAddDialogOpen(apiKey && locations.length === 0);
  }, [apiKey, locations]);

  return (
    <>
      <Container maxWidth="md">
        {locations.length > 0 && (
          <Stack spacing={1}>
            {locations.map((location) => (
              <LocationItem
                key={location}
                location={location}
                apiKey={apiKey}
                handleDelete={handleDelete}
              />
            ))}
          </Stack>
        )}
        <WeatherSpeedDial handleClick={handleSpeedDialClick} />
      </Container>
      <KeyDialog
        open={keyDialogOpen}
        onCancel={handleKeyDialogCancel}
        onOK={handleKeyDialogOK}
      />
      <AddDialog
        open={addDialogOpen}
        onCancel={handleAddDialogCancel}
        onOK={handleAddDialogOK}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        location={deleteLocation}
        onOK={handleDeleteOK}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}

export default App;

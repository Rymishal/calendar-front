import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CalendarPage from './components/calendar-page';
import AddEventPage from './components/add-event-page';
import EventDetailsPage from './components/event-details-page';
import { CalendarEvent } from './types/calendar-event';
import store from './store/store';

const App = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route
              path="/add"
              element={<AddEventPage addEvent={(event) => setEvents([...events, event])} />}
            />
            <Route path="/event/:id" element={<EventDetailsPage events={events} setEvents={setEvents} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  );
};

export default App;

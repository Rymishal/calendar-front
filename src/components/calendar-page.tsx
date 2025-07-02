
import React, {useState} from "react";
import { useNavigate } from "react-router";
import "../styles/calendar-view.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {getEvents} from "../api/api";
import {StatusEnum} from "../types/events-loading-status";
import ErrorInfo from "./error-info";
import {Button} from "@mui/material";
import LoadingInfo from "./loading-info";

const CalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendarSlice.events);
  const status = useSelector((state: RootState) => state.calendarSlice.eventsLoadingStatus);
  const error = useSelector((state: RootState) => state.calendarSlice.error);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  if(status === StatusEnum.LOADING) {
    return (<LoadingInfo />)
  } else if(status === StatusEnum.NOT_LOADED) {
      dispatch(getEvents());
  } else if(status == StatusEnum.ERROR) {
      return <ErrorInfo errorMessage={error} actionMessage="Reload events" action={() => dispatch(getEvents())} />
  }

  return (
    <div className="calendar-view">
      <h1>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h1>
        <div className="calendar-controls">
          <Button variant="outlined" onClick={() => changeMonth(-1)}>
            Prev
          </Button>
          <Button variant="outlined" onClick={() => changeMonth(1)} className="button">
            Next
          </Button>
          <Button
            onClick={() => navigate("/add")}
            variant="contained"
            color="primary"
            className="button"
          >
            Add Event
          </Button>
        </div>
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString();
          const dayEvents = events.filter(e => new Date(e.startDateTime).toDateString() === new Date(dateStr).toDateString());
          return (
            <div key={day} className="calendar-day">
              <span>{day}</span>
              {dayEvents.map(e => (
                <div key={e.id} className="event" onClick={() => navigate(`/event/${e.id}`)}>
                  {e.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPage;

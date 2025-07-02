import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import { CalendarEvent } from "../types/calendar-event";
import EventForm from "./event-form";
import "../styles/event-details-page.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {deleteEvent, getEvent, getEvents, updateEvent} from "../api/api";
import {resetEvent, resetState} from "../store/calendar-slice";
import {StatusEnum} from "../types/events-loading-status";
import LoadingInfo from "./loading-info";
import ErrorInfo from "./error-info";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = useSelector((state: RootState) => state.calendarSlice.event);
  const status = useSelector((state: RootState) => state.calendarSlice.eventLoadingStatus);
  const error = useSelector((state: RootState) => state.calendarSlice.error);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEvent(id!));
  },[])

  if(status === StatusEnum.LOADING) {
    return (<LoadingInfo />)
  } else if(status === StatusEnum.SAVED || status === StatusEnum.DELETED) {
    dispatch(resetState());
    navigate("/");
  } else if(status === StatusEnum.ERROR) {
    return <ErrorInfo errorMessage={error} actionMessage="Reload event" action={() => dispatch(getEvent(id))} />
  }

  const handleUpdate = (updated: CalendarEvent) => {
    dispatch(updateEvent(updated));
  };

  const handleDelete = (event: CalendarEvent) => {
    dispatch(deleteEvent(event.id));
  };

  return (
    <div className="event-details-page">
      <h1>Event Details</h1>
      <EventForm event={event}
                 onSubmit={handleUpdate}
                 resetEvent={() => {dispatch(resetEvent())}}
                 onDelete={() => handleDelete(event)}
      />
    </div>
  );
};

export default EventDetailsPage;

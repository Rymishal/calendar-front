import React from "react";
import { useNavigate } from "react-router";
import { CalendarEvent } from "../types/calendar-event";
import EventForm from "./event-form";
import "../styles/add-event-page.scss";
import {createEvent} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {StatusEnum} from "../types/events-loading-status";
import {resetError, resetEvent, resetState} from "../store/calendar-slice";
import LoadingInfo from "./loading-info";
import ErrorInfo from "./error-info";

const AddEventPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state: RootState) => state.calendarSlice.eventLoadingStatus);
  const error = useSelector((state: RootState) => state.calendarSlice.error);

  const handleSubmit = (event: CalendarEvent) => {
    dispatch(createEvent(event));
  };

  if(status === StatusEnum.SAVED) {
    dispatch(resetState());
    navigate("/");
  } else if(status === StatusEnum.LOADING) {
    return (<LoadingInfo />)
  } else if(status == StatusEnum.ERROR) {
    return <ErrorInfo errorMessage={error} actionMessage="Reload page" action={() => dispatch(resetError())} />
  }

  return (
    <div className="add-event-page">
      <h1>Add Event</h1>
      <EventForm onSubmit={handleSubmit}
                 resetEvent={() => {dispatch(resetEvent())}}
      />
    </div>
  );
};

export default AddEventPage;

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CalendarEvent} from '../types/calendar-event'
import {createEvent, updateEvent, getEvent, getEvents, deleteEvent} from "../api/api";
import {StatusEnum} from "../types/events-loading-status";

interface CalendarState {
    events: CalendarEvent[];
    eventsLoadingStatus: StatusEnum;
    event: CalendarEvent | null;
    eventLoadingStatus: StatusEnum;
    error: string | null;
}

const initialState: CalendarState = {
    events: [],
    eventsLoadingStatus: StatusEnum.NOT_LOADED,
    event: null,
    eventLoadingStatus: StatusEnum.NOT_LOADED,
    error: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        resetState: (state) => {
            state.events = [];
            state.eventsLoadingStatus = StatusEnum.NOT_LOADED;
            state.event = null;
            state.eventLoadingStatus = StatusEnum.NOT_LOADED;
            state.error = null;
        },
        resetEvent: (state) => {
            state.event = null;
            state.eventLoadingStatus = StatusEnum.NOT_LOADED;
            state.error = null;
        },
        resetError: (state) => {
            state.eventLoadingStatus = StatusEnum.NOT_LOADED;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state: CalendarState) => {
                state.eventsLoadingStatus = StatusEnum.LOADING;
            })
            .addCase(getEvents.rejected, (state: CalendarState, action) => {
                state.error = action.payload;
                state.eventsLoadingStatus = StatusEnum.ERROR;
            })
            .addCase(getEvents.fulfilled, (state: CalendarState, action: PayloadAction<CalendarEvent[]>) => {
                state.eventsLoadingStatus = StatusEnum.LOADED;
                state.events = action.payload;
            })
            .addCase(getEvent.pending, (state: CalendarState) => {
                state.eventLoadingStatus = StatusEnum.LOADING;
            })
            .addCase(getEvent.rejected, (state: CalendarState, action) => {
                state.error = action.payload;
                state.eventLoadingStatus = StatusEnum.ERROR;
            })
            .addCase(getEvent.fulfilled, (state: CalendarState, action: PayloadAction<CalendarEvent>) => {
                state.eventLoadingStatus = StatusEnum.LOADED;
                state.event = action.payload;
            })
            .addCase(createEvent.pending, (state: CalendarState) => {
                state.eventLoadingStatus = StatusEnum.LOADING;
            })
            .addCase(createEvent.rejected, (state: CalendarState, action) => {
                state.error = action.payload;
                state.eventLoadingStatus = StatusEnum.ERROR;
            })
            .addCase(createEvent.fulfilled, (state: CalendarState, action: PayloadAction<CalendarEvent>) => {
                state.eventLoadingStatus = StatusEnum.SAVED;
                state.event = action.payload;
            })
            .addCase(updateEvent.pending, (state: CalendarState) => {
                state.eventLoadingStatus = StatusEnum.LOADING;
            })
            .addCase(updateEvent.rejected, (state: CalendarState, action) => {
                state.error = action.payload;
                state.eventLoadingStatus = StatusEnum.ERROR;
            })
            .addCase(updateEvent.fulfilled, (state: CalendarState, action: PayloadAction<CalendarEvent>) => {
                state.eventLoadingStatus = StatusEnum.SAVED;
                state.event = action.payload;
            })
            .addCase(deleteEvent.pending, (state: CalendarState) => {
                state.eventLoadingStatus = StatusEnum.LOADING;
            })
            .addCase(deleteEvent.rejected, (state: CalendarState, action) => {
                state.error = action.payload;
                state.eventLoadingStatus = StatusEnum.ERROR;
            })
            .addCase(deleteEvent.fulfilled, (state: CalendarState) => {
                state.eventLoadingStatus = StatusEnum.DELETED;
            });
    }
})

export default calendarSlice.reducer
export const { resetState, resetEvent, resetError } = calendarSlice.actions
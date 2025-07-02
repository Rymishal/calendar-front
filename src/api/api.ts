import {createAsyncThunk} from "@reduxjs/toolkit";
import {CalendarEvent} from "../types/calendar-event";

export const getEvents = createAsyncThunk<CalendarEvent[], {rejectValue: string}> (
    'calendar/getEvents',
    async (_, {rejectWithValue}: AsyncThunkConfig) => {
        try {
            const url = `/api/events`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                throw new Error(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    }
);

export const getEvent = createAsyncThunk<CalendarEvent, string, {rejectValue}> (
    'calendar/getEvent',
    async (eventId, {rejectWithValue}: AsyncThunkConfig) => {
        try {
            console.log(111);
            const url = `/api/events/${eventId}`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                throw new Error(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    }
);

export const createEvent = createAsyncThunk<CalendarEvent, CalendarEvent, {rejectValue}> (
    'calendar/createEvent',
    async (event, {rejectWithValue}: AsyncThunkConfig) => {
        try {
            const url = `/api/events`;
            const response = await fetch(url, {method: 'POST',
                body: JSON.stringify(event),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to connect to server. ${(error as Error).message}`);
        }
    }
);

export const updateEvent = createAsyncThunk<CalendarEvent, CalendarEvent, {rejectValue}> (
    'calendar/updateEvent',
    async (event, {rejectWithValue}: AsyncThunkConfig) => {
        try {
            const url = `/api/events/${event.id}`;
            const response = await fetch(url, {method: 'PUT',
                body: JSON.stringify(event),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to connect to server. ${(error as Error).message}`);
        }
    }
);

export const deleteEvent = createAsyncThunk<void, string, {rejectValue}> (
    'calendar/deleteEvent',
    async (eventId, {rejectWithValue}: AsyncThunkConfig) => {
        try {
            const url = `/api/events/${eventId}`;
            const response = await fetch(url, {method: 'DELETE'});
            if (!response.ok) {
                throw new Error(`Response is ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(`Failed to connect to server. ${(error as Error).message}`);
        }
    }
);
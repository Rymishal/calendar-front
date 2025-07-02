import React from "react";
import { CalendarEvent } from "../types/calendar-event";
import "../styles/event-form.scss";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router";
import {Box, Button, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";

interface EventFormProps {
  event?: CalendarEvent;
  onSubmit: (event: CalendarEvent) => void;
  resetEvent: () => void;
  onDelete?: () => void;
}

interface EventFormInputs {
    title: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    location: string;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, resetEvent, onDelete }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: event?.title || "",
            description: event?.description || "",
            startDateTime: event?.startDateTime.toLocaleString() || null,
            endDateTime: event?.endDateTime.toLocaleString() || null,
            location: event?.location || "",
        },
    });
    const navigate = useNavigate();

    const onValid = (data: EventFormInputs) => {
        if (new Date(data.endDateTime) < new Date(data.startDateTime)) {
            alert("End date/time cannot be earlier than start date/time.");
            return;
        }

        onSubmit({
            id: event?.id || crypto.randomUUID(),
            ...data,
        });
    };

    const handleCancel = () => {
        reset();
        resetEvent();
        navigate("/");
    }
    return (
        <form className="event-form" onSubmit={handleSubmit(onValid)}>
            <TextField
                label="Title"
                {...register("title", { required: true })}
                error={!!errors.title}
                helperText={errors.title && "Title is required"}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Description"
                {...register("description")}
                multiline
                rows={4}
                fullWidth
                margin="normal"
            />
            <Box className="dates">
            <Controller
                name="startDateTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DateTimePicker
                        label="Start Date & Time"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                margin="normal"
                                error={!!errors.startDateTime}
                                helperText={errors.startDateTime && "Start Date & Time is required"}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="endDateTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <DateTimePicker
                        label="End Date & Time"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                margin="normal"
                                error={!!errors.endDateTime}
                                helperText={errors.endDateTime && "End Date & Time is required"}
                            />
                        )}
                    />
                )}
            />
            </Box>

            <TextField
                label="Location"
                {...register("location")}
                fullWidth
                margin="normal"
            />

            <div className="buttons">
                <Button type="submit" variant="contained" color="primary">
                    {event ? "Update" : "Add"} Event
                </Button>

                {onDelete && (
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                )}
                <Button
                    type="button"
                    variant="text"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};


export default EventForm;

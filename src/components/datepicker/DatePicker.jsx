import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, TextField } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

function DateRangePicker({ value, onChange }) {
    const [startDate, setStartDate] = useState(value[0]);
    const [endDate, setEndDate] = useState(value[1]);

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
        onChange([newValue, endDate]);
    };

    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
        onChange([startDate, newValue]);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                display="flex"
                gap={4}
                p={3}
                borderRadius={2}
                boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
                bgcolor="#ffffff"
                maxWidth={500}
                mx="auto"
            >
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <CalendarTodayIcon style={{ color: '#6b8e23' }} />
                                ),
                                ...params.InputProps,
                            }}
                        />
                    )}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <CalendarTodayIcon style={{ color: '#6b8e23' }} />
                                ),
                                ...params.InputProps,
                            }}
                        />
                    )}
                />
            </Box>
        </LocalizationProvider>
    );
}

export default DateRangePicker;

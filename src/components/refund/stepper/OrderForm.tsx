import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';

const OrderForm = () => {
  const { control, setValue, getValues, register } = useFormContext();

  const [selectedDate, setSelectedDate] = React.useState(null);

  const value = getValues('refund_request_date') as Date;

  useEffect(() => {
    register('refund_request_date');
  }, [register]);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [setSelectedDate, value]);

  const handleDateChange = (date) => {
    date = dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');

    setSelectedDate(date);
    setValue('refund_request_date', date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="woo_order_id"
            render={({ field }) => (
              <TextField
                id="order-id"
                label="Order ID"
                variant="standard"
                placeholder="Enter Order ID"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name="refund_request_date"
            render={({ field }) => (
              <KeyboardDatePicker
                // variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Refund Request Date"
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            )}
          />
        </Grid>

        <Controller
          control={control}
          name="customer_name"
          render={({ field }) => (
            <TextField
              id="customer-name"
              label="Customer Name"
              variant="standard"
              placeholder="Customer Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_no"
          render={({ field }) => (
            <TextField
              id="phone-no"
              label="Phone No"
              variant="standard"
              placeholder="01610000000"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default OrderForm;

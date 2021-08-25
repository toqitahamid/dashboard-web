import { Controller, useForm, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import dayjs from 'dayjs';

const OrderForm = () => {
  const { control, setValue, getValues, register } = useFormContext();

  const [selectedDate, setSelectedDate] = React.useState(null);

  // const { handleSubmit, control, setValue, register, getValues } = useForm();

  const value = getValues('rma_creation_date') as Date;

  useEffect(() => {
    register('rma_creation_date');
  }, [register]);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [setSelectedDate, value]);

  const handleDateChange = (date) => {
    console.log(date);
    date = dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');
    console.log(date);
    setSelectedDate(date);
    setValue('rma_creation_date', date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="rma_id"
            render={({ field }) => (
              <TextField
                id="rma-id"
                label="RMA ID"
                variant="standard"
                placeholder="Enter RMA ID"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>

        <Controller
          control={control}
          name="rma_creation_date"
          render={({ field }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="RMA Create Date"
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          )}
        />

        <Controller
          control={control}
          name="order_id"
          render={({ field }) => (
            <TextField
              id="order-id"
              label="Order ID"
              variant="standard"
              placeholder="Order ID"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="product_name"
          render={({ field }) => (
            <TextField
              id="product-name"
              label="Product Name"
              variant="standard"
              placeholder="Product Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="sku"
          render={({ field }) => (
            <TextField
              id="sku"
              label="SKU"
              variant="standard"
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
          rules={{ required: 'Sku is required' }}
        />

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
          name="customer_phone"
          render={({ field }) => (
            <TextField
              id="customer-phone"
              label="Customer Phone"
              variant="standard"
              placeholder="Customer Phone"
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

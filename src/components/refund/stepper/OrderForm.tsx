import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const OrderForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="orderID"
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
            name="orderDate"
            render={({ field }) => (
              <KeyboardDatePicker
                placeholder="10/10/2020"
                disableFuture
                format="dd/MM/yyyy"
                label="Order Date"
                // views={['year', 'month', 'date']}
                onChange={(date) => field.onChange(date)}
                value={field.value}
              />
            )}
          />
        </Grid>

        <Controller
          control={control}
          name="sku"
          render={({ field }) => (
            <TextField
              id="sku"
              label="SKU"
              variant="standard"
              placeholder="PNGN-1223"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="customerName"
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
          name="phoneNo"
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

        <Controller
          control={control}
          name="bkashPhoneNo"
          render={({ field }) => (
            <TextField
              id="bkash-phone-number"
              label="bKash Phone Number"
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

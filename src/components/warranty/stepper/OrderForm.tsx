import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField } from '@material-ui/core';
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
            name="rmaID"
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

        <Grid item>
          <Controller
            control={control}
            name="rmaCreationDate"
            render={({ field }) => (
              <KeyboardDatePicker
                placeholder="10/10/2020"
                disableFuture
                format="dd/MM/yyyy"
                label="RMA Creation Date"
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
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="orderID"
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
          name="productName"
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
      </Grid>
    </>
  );
};

export default OrderForm;

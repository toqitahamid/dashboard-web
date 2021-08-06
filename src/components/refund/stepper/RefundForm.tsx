import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: 16,
  },
  formControl: {
    // margin: 8,
    minWidth: 300,
    paddingBottom: 20,
  },
}));

const paymentGatewayList = [
  { value: 0, text: 'SSLCommerz' },
  { value: 1, text: 'bKash' },
  { value: 2, text: 'Send Money' },
];

const refundTypeList = [
  { value: 0, text: 'Full' },
  { value: 1, text: 'Partial' },
  { value: 2, text: 'Full w/o bKash cashback' },
  { value: 3, text: 'Partial w/o bKash cashback' },
];

const statusList = [
  { value: 0, text: 'New Request' },
  { value: 1, text: 'Refunded' },
  { value: 2, text: 'Not Refunded' },
  { value: 3, text: 'Check Again' },
];

const RefundForm = () => {
  const classes = useStyles();
  const { control } = useFormContext();
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.formControl}>
          <Controller
            control={control}
            name="refundAmount"
            render={({ field }) => (
              <TextField
                id="refund-amount"
                label="Refund Amount"
                variant="standard"
                placeholder="Enter refund amount"
                // fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="payment-gateway">
              Select a Payment Gateway
            </InputLabel>
            <Controller
              control={control}
              name="paymentGateway"
              render={({ field }) => (
                <Select
                  labelId="payment-gateway"
                  id="payment-gateway"
                  value={field.value}
                  onChange={(data) => field.onChange(data)}
                >
                  {paymentGatewayList.map((data) => (
                    <MenuItem key={data.value} value={data.value}>
                      {data.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <FormControl className={classes.formControl}>
          <InputLabel id="refund-type">Select a Refund Type</InputLabel>
          <Controller
            control={control}
            name="refundType"
            render={({ field }) => (
              <Select
                labelId="refund-type"
                id="refund-type"
                value={field.value}
                onChange={(data) => field.onChange(data)}
              >
                {refundTypeList.map((data) => (
                  <MenuItem key={data.value} value={data.value}>
                    {data.text}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="status">Select a Refund Status</InputLabel>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  labelId="status"
                  id="status"
                  value={field.value}
                  onChange={(data) => field.onChange(data)}
                >
                  {statusList.map((data) => (
                    <MenuItem key={data.value} value={data.value}>
                      {data.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default RefundForm;

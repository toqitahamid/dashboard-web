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
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

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

// const paymentGatewayList = [
//   { value: 0, text: 'SSLCommerz' },
//   { value: 1, text: 'bKash' },
//   { value: 2, text: 'Send Money' },
// ];
//
// const statusList = [
//   { value: 0, text: 'New Request' },
//   { value: 1, text: 'Refunded' },
//   { value: 2, text: 'Not Refunded' },
//   { value: 3, text: 'Check Again' },
// ];

const RefundForm = () => {
  const classes = useStyles();
  const [paymentGatewayList, setPaymentGatewayList] = useState([]);
  const [refundStatusList, setRefundStatusList] = useState([]);
  const [refundTypeList, setRefundTypeList] = useState([]);

  const { control } = useFormContext();

  useEffect(() => {
    const paymentGateway = async () => {
      const response = await axios(
        'http://localhost:20802/refund/api/v1/payment-gateway'
      );
      setPaymentGatewayList(response.data.data);
      console.log(response.data.data);
    };
    paymentGateway();
  }, []);

  useEffect(() => {
    const refundStatus = async () => {
      const response = await axios(
        'http://localhost:20802/refund/api/v1/refund-status'
      );
      setRefundStatusList(response.data.data);
    };
    refundStatus();
  }, []);

  useEffect(() => {
    const refundTypes = async () => {
      const response = await axios(
        'http://localhost:20802/refund/api/v1/refund-type'
      );
      setRefundTypeList(response.data.data);
    };
    refundTypes();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.formControl}>
          <Controller
            control={control}
            name="refund_amount"
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
              name="gateway_name"
              render={({ field }) => (
                <Select
                  labelId="payment-gateway"
                  id="payment-gateway"
                  value={field.value}
                  onChange={(data) => field.onChange(data)}
                >
                  {paymentGatewayList.map((data) => (
                    <MenuItem key={data.ID} value={data.gateway_name}>
                      {data.gateway_name}
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
            name="refund_type"
            render={({ field }) => (
              <Select
                labelId="refund-type"
                id="refund-type"
                value={field.value}
                onChange={(data) => field.onChange(data)}
              >
                {refundTypeList.map((data) => (
                  <MenuItem key={data.ID} value={data.type}>
                    {data.type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="refund-status">Select a Refund Status</InputLabel>
            <Controller
              control={control}
              name="refund_status"
              render={({ field }) => (
                <Select
                  labelId="refund-status"
                  id="refund-status"
                  value={field.value}
                  onChange={(data) => field.onChange(data)}
                >
                  {refundStatusList.map((data) => (
                    <MenuItem key={data.ID} value={data.status}>
                      {data.status}
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

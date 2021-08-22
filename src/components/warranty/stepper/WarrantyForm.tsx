import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import useSWR from 'swr';
import SelectWarrantyType from './SelectWarrantyType';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: 16,
  },
  formControl: {
    margin: 8,
    minWidth: 300,
    paddingBottom: 30,
  },
}));

// const warrantyTypeList = [
//   { value: 0, text: 'Manufacturing Defects (First 7 days of Purchase)' },
//   { value: 1, text: 'Wrong Product (First 3 days of Purchase)' },
//   { value: 2, text: 'Replacement (First 3 days of purchase)' },
//   { value: 3, text: 'Product Sent to Merchant' },
//   { value: 4, text: 'Servicing Request (Within Index Period)' },
// ];

// const statusList = [
//   { value: 0, text: 'New Request' },
//   { value: 1, text: 'Pickup Request from Pathao' },
//   { value: 2, text: 'In-house Checking' },
//   { value: 3, text: 'Product Sent to Merchant' },
//   { value: 4, text: 'New Unit Recieved from Merchant' },
//   { value: 5, text: 'Old Unit Recieved from Merchant' },
//   { value: 6, text: 'New Unit Sent to Customer' },
//   { value: 7, text: 'Old Unit Sent to Customer' },
//   { value: 8, text: 'Refund Requested' },
//   { value: 9, text: 'Recieved from scs' },
//   { value: 10, text: 'Recieved from Pathao' },
//   { value: 11, text: 'Refunded' },
//   {
//     value: 12,
//     text: 'Customer has sent the product but not arrived till now',
//   },
// ];

const fetcher = (url) => fetch(url).then((res) => res.json());

const WarrantyForm = ({ cookies }) => {
  const classes = useStyles();
  const { control } = useFormContext();
  const [warrantyTypeList, setWarrantyTypeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [merchantNameList, setMerchantNameList] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  useEffect(() => {
    const warrantyTypes = async () => {
      const response = await axios(
        'https://api.penguin.com.bd/warranty/api/v1/warranty-type',
        config
      );
      setWarrantyTypeList(response.data.data);
    };
    warrantyTypes();
  }, []);

  useEffect(() => {
    const statuses = async () => {
      const response = await axios(
        'https://api.penguin.com.bd/warranty/api/v1/status',
        config
      );
      setStatusList(response.data.data);
      console.log(response.data.data);
    };
    statuses();
  }, []);

  useEffect(() => {
    const merchants = async () => {
      const response = await axios(
        'https://api.penguin.com.bd/warranty/api/v1/merchant',
        config
      );
      setMerchantNameList(response.data.data);
    };
    merchants();
  }, []);

  // console.log(merchantNameList);

  return (
    <>
      <Grid container>
        <Controller
          control={control}
          name="reason"
          render={({ field }) => (
            <TextField
              id="reason"
              label="Reason"
              variant="standard"
              placeholder="Enter reason for warranty"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="warranty-type">Select a Warranty Types</InputLabel>
          <Controller
            control={control}
            name="warranty_type"
            render={({ field }) => (
              <Select
                labelId="warranty-type"
                id="warranty-type"
                value={field.value}
                onChange={(data) => field.onChange(data)}
              >
                {warrantyTypeList.map((data) => (
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
            <InputLabel id="status">Select a Status</InputLabel>
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
                    <MenuItem key={data.ID} value={data.status}>
                      {data.status}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="merchant">Select a Merchant</InputLabel>
            <Controller
              control={control}
              name="merchant_name"
              render={({ field }) => (
                <Select
                  labelId="merchant-name"
                  id="merchant-name"
                  value={field.value}
                  onChange={(data) => field.onChange(data)}
                >
                  {merchantNameList.map((data) => (
                    <MenuItem key={data.ID} value={data.name}>
                      {data.name}
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

export default WarrantyForm;

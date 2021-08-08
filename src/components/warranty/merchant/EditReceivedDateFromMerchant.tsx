import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

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

export default function Index({
  currentReceivedDateFromMerchant,
  warrantyId,
  setIsReceivedDateFromMerchantChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      product_received_date_from_merchant: '',
    },
  });

  const classes = useStyles();

  // useEffect(() => {
  //   const merchants = async () => {
  //     const response = await axios(
  //       `http://localhost:20801/warranty/api/v1/warranty`
  //     );
  //     setMerchantList(response.data.data);
  //     console.log(response.data.data);
  //   };
  //   merchants();
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const onSubmit = async (values) => {
    setOpen(false);
    const res = await axios
      .patch(
        `http://localhost:20801/warranty/api/v1/warranty/update-received-date-from-merchant/${warrantyId}`,
        {
          product_received_date_from_merchant:
            values.product_received_date_from_merchant,
        },
        config
      )
      .then(setIsReceivedDateFromMerchantChanged);
    console.log(values);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        {currentReceivedDateFromMerchant === ''
          ? 'Tap to enter date'
          : currentReceivedDateFromMerchant}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Date Received from Merchant
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Controller
                  control={control}
                  name="product_received_date_from_merchant"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      placeholder="20/01/2021"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

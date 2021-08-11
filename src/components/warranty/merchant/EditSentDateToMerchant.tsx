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
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import dayjs from 'dayjs';

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
  currentSentDateToMerchant,
  warrantyId,
  setIsSentDateToMerchantChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const { handleSubmit, control, setValue, register, getValues } = useForm();

  const value = getValues('product_sent_date_to_merchant') as Date;

  useEffect(() => {
    register('product_sent_date_to_merchant');
  }, [register]);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [setSelectedDate, value]);

  const handleDateChange = (date) => {
    console.log(date);
    date = dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');
    console.log(date);
    setSelectedDate(date);
    setValue('product_sent_date_to_merchant', date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

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
        `http://localhost:20801/warranty/api/v1/warranty/update-sent-date-to-merchant/${warrantyId}`,
        {
          product_sent_date_to_merchant: values.product_sent_date_to_merchant,
        },
        config
      )
      .then(setIsSentDateToMerchantChanged);
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
        {currentSentDateToMerchant === ''
          ? 'Tap to enter date'
          : formatDate(currentSentDateToMerchant)}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Date Sent to Merchant
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Controller
                  control={control}
                  name="product_sent_date_to_merchant"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      {/*<Grid container justifyContent="space-around">*/}
                      <KeyboardDatePicker
                        // variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      {/*</Grid>*/}
                    </MuiPickersUtilsProvider>
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

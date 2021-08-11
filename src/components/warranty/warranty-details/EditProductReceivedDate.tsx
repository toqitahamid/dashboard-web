import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { firebaseClient } from '../../../../firebaseClient';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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

export default function FormDialog({
  currentDate,
  warrantyId,
  setIsDateChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const { handleSubmit, control, setValue, register, getValues } = useForm();

  const value = getValues('product_received_date') as Date;

  useEffect(() => {
    register('product_received_date');
  }, [register]);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [setSelectedDate, value]);

  const handleDateChange = (date) => {
    console.log(date);
    date = dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');
    console.log(date);
    setSelectedDate(date);
    setValue('product_received_date', date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  const classes = useStyles();

  // useEffect(() => {
  //   const statuses = async () => {
  //     const response = await axios(
  //       `http://localhost:20801/warranty/api/v1/warranty`
  //     );
  //     console.log(response.data.data);
  //   };
  //   statuses();
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
        `http://localhost:20801/warranty/api/v1/warranty/update-product-received-date/${warrantyId}`,
        {
          product_received_date: values.product_received_date,
        },
        config
      )
      .then(setIsDateChanged);
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
        {currentDate === '' ? 'No Date' : formatDate(currentDate)}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Product Received Date
          </DialogTitle>
          <DialogContent>
            {/*<Grid item xs={12}>*/}
            <FormControl className={classes.formControl}>
              {/*<InputLabel id="status">Product Received Date</InputLabel>*/}
              <Controller
                control={control}
                name="product_received_date"
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
            {/*</Grid>*/}
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

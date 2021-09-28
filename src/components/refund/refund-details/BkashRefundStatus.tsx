import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';

import { FormControl, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';

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

export default function FormDialog({ setRefundStatusDetails, cookies }) {
  const [open, setOpen] = React.useState(false);

  const [statusUpdateSuccessSnackbarOpen, setStatusUpdateSuccessSnackbarOpen] =
    useState(false);
  const [statusUpdateFailedSnackbarOpen, setStatusUpdateFailedSnackbarOpen] =
    useState(false);

  const [snackbarFailedStatus, setSnackbarFailedStatus] = useState('');

  const [statusList, setStatusList] = useState([]);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      payment_id: '',
      trx_id: '',
    },
  });

  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  useEffect(() => {
    const statuses = async () => {
      const response = await axios(
        `http://localhost:20802/refund/api/v1/refund-status`
      );
      setStatusList(response.data.data);
      // console.log(response.data.data);
    };
    statuses();
  }, []);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const snackbarSuccessHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStatusUpdateSuccessSnackbarOpen(false);
  };

  const snackbarFailedHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStatusUpdateFailedSnackbarOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
    console.log(values);

    setOpen(false);

    const refundUrl =
      'http://localhost:20802/refund/api/v1/refund/bkash-refund-status';

    axios
      .post(refundUrl, {
        payment_id: values.payment_id,
        trx_id: values.trx_id,
      })
      .then((response) => {
        console.log(response);
        setRefundStatusDetails(response.data);
        setStatusUpdateSuccessSnackbarOpen(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setSnackbarFailedStatus(error.response.data.error.errorMessage);
          setStatusUpdateFailedSnackbarOpen(true);
          console.log(error.response.data); // => the response payload
        }
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Refund
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create Refund Request
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                {/*<InputLabel id="status">Select a Status</InputLabel>*/}
                <Controller
                  control={control}
                  name="payment_id"
                  render={({ field }) => (
                    <TextField
                      id="payment_id"
                      label="Payment ID"
                      variant="standard"
                      placeholder="Enter Payment ID"
                      fullWidth
                      margin="normal"
                      value={field.value}
                      onChange={(data) => field.onChange(data)}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="trx_id"
                  render={({ field }) => (
                    <TextField
                      id="trx_ID"
                      label="Transaction ID"
                      variant="standard"
                      placeholder="Enter Transaction ID"
                      fullWidth
                      margin="normal"
                      value={field.value}
                      onChange={(data) => field.onChange(data)}
                      {...field}
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
              Crate
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={statusUpdateSuccessSnackbarOpen}
          autoHideDuration={2000}
          onClose={snackbarSuccessHandleClose}
        >
          <Alert severity="success">Status Updated</Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={statusUpdateFailedSnackbarOpen}
          autoHideDuration={2000}
          onClose={snackbarFailedHandleClose}
        >
          <Alert severity="error">{snackbarFailedStatus}</Alert>
        </Snackbar>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';

import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@material-ui/core';
import axios from 'axios';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { firebaseClient } from '../../../../firebaseClient';

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
  currentStatus,
  refundID,
  setIsStatusChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const [statusUpdateSuccessSnackbarOpen, setStatusUpdateSuccessSnackbarOpen] =
    useState(false);
  const [statusUpdateFailedSnackbarOpen, setStatusUpdateFailedSnackbarOpen] =
    useState(false);

  const [statusList, setStatusList] = useState([]);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      status: '',
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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

  const onSubmit = async (values) => {
    setOpen(false);
    const res = await axios
      .patch(
        `http://localhost:20802/refund/api/v1/refund/update-status-by-name/${refundID}`,
        {
          status: values.status,
        }
      )
      .then(setIsStatusChanged)
      .then(() => setStatusUpdateSuccessSnackbarOpen(true))
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setStatusUpdateFailedSnackbarOpen(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
        }
      });

    // console.log(values);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        {currentStatus}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Refund Status</DialogTitle>
          <DialogContent>
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
                      defaultValue={currentStatus}
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
          <Alert severity="error">Status already exist</Alert>
        </Snackbar>
      </form>
    </div>
  );
}

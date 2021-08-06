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
  currentReason,
  warrantyId,
  setIsReasonChanged,
}) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      warranty_reason: '',
    },
  });

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

  const onSubmit = async (values) => {
    setOpen(false);
    const res = await axios
      .patch(
        `http://localhost:20801/warranty/api/v1/warranty/updateWarrantyReason/${warrantyId}`,
        {
          reason: values.warranty_reason,
        }
      )
      .then(setIsReasonChanged);
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
        {currentReason === '' ? 'No Date' : currentReason}
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
                name="warranty_reason"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    margin="normal"
                    multiline
                    required
                    fullWidth
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
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

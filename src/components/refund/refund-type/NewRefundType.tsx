import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export default function FormDialog({ cookies }) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      type: '',
    },
  });

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
    axios
      .post('http://localhost:20802/refund/api/v1/refund-type', {
        type: values.type,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        + New Refund Type
      </Button>

      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          // className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle id="form-dialog-title">New Refund Type</DialogTitle>

          <DialogContent dividers>
            <Controller
              control={control}
              name="type"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  // id="email"
                  label="Status"
                  // name="email"
                  // autoComplete="email"
                  // autoFocus
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Email is required ' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/*<Button onClick={handleClose} color="primary">*/}
            {/*  Subscribe*/}
            {/*</Button>*/}
            <Button
              type="submit"
              onClick={handleClose}
              // fullWidth
              color="primary"
              // className={classes.submit}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

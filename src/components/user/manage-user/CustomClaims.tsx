import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, MenuItem, Select } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { bool } from 'yup';

export default function FormDialog({ cookies }) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      uid: '',
      key: '',
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
      .put(
        'http://localhost:20803/user-custom-claims',
        {
          uid: values.uid,
          claims: [{ key: values.key, value: true }],
        },
        config
      )
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
        Add Custom Claims
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
          <DialogTitle id="form-dialog-title">Add Custom Claims</DialogTitle>

          <DialogContent dividers>
            <Controller
              control={control}
              name="uid"
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
                  label="User ID"
                  // name="email"
                  // autoComplete="email"
                  // autoFocus
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Email is required ' }}
            />

            {/*<Controller*/}
            {/*  control={control}*/}
            {/*  name="key"*/}
            {/*  render={({*/}
            {/*    field: { onChange, value },*/}
            {/*    fieldState: { error },*/}
            {/*  }) => (*/}
            {/*    <TextField*/}
            {/*      variant="outlined"*/}
            {/*      margin="normal"*/}
            {/*      required*/}
            {/*      fullWidth*/}
            {/*      value={value}*/}
            {/*      onChange={onChange}*/}
            {/*      error={!!error}*/}
            {/*      // id="email"*/}
            {/*      label="Claim Name"*/}
            {/*      // name="email"*/}
            {/*      // autoComplete="email"*/}
            {/*      // autoFocus*/}
            {/*      helperText={error ? error.message : null}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  rules={{ required: 'Password is required ' }}*/}
            {/*/>*/}

            {/*<FormControl className={classes.formControl}>*/}
            {/*  <InputLabel id="status">Role</InputLabel>*/}
            <Controller
              control={control}
              name="key"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Select
                  labelId="claim-key"
                  id="claim-key"
                  fullWidth
                  label="Role"
                  variant="outlined"
                  value={value}
                  // onChange={(data) => onChange(data)}
                  onChange={onChange}
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'storeManager'}>Store Manager</MenuItem>
                  <MenuItem value={'storeSupport'}>Store Support</MenuItem>
                </Select>
              )}
              rules={{ required: 'Password is required ' }}
            />
            {/*</FormControl>*/}
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

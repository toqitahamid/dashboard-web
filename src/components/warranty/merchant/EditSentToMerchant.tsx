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
  currentSentToMerchant,
  warrantyId,
  setIsSentToMerchantChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      sent_to_merchant: '',
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
        `https://api.penguin.com.bd/warranty/api/v1/warranty/update-sent-to-merchant/${warrantyId}`,
        {
          sent_to_merchant: values.sent_to_merchant,
        },
        config
      )
      .then(setIsSentToMerchantChanged);
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
        {currentSentToMerchant === ''
          ? 'Click to enter'
          : currentSentToMerchant}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Update Sent to Merchant
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="status">Select an Option</InputLabel>
                <Controller
                  control={control}
                  name="sent_to_merchant"
                  render={({ field }) => (
                    <Select
                      labelId="sent_to_merchant"
                      id="sent_to_merchant"
                      value={field.value}
                      defaultValue={currentSentToMerchant}
                      onChange={(data) => field.onChange(data)}
                    >
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                      <MenuItem value={'No'}>No</MenuItem>
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
      </form>
    </div>
  );
}

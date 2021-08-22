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
  currentMerchant,
  warrantyId,
  setIsMerchantChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const [merchantList, setMerchantList] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      merchant_name: '',
    },
  });

  const classes = useStyles();

  useEffect(() => {
    const merchants = async () => {
      const response = await axios(
        `https://api.penguin.com.bd/warranty/api/v1/merchant`,
        config
      );
      setMerchantList(response.data.data);
      console.log(response.data.data);
    };
    merchants();
  }, []);

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
        `https://api.penguin.com.bd/warranty/api/v1/warranty/update-merchant-name/${warrantyId}`,
        {
          merchant_name: values.merchant_name,
        },
        config
      )
      .then(setIsMerchantChanged);
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
        {currentMerchant}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Merchant Name</DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="status">Select a Merchant</InputLabel>
                <Controller
                  control={control}
                  name="merchant_name"
                  render={({ field }) => (
                    <Select
                      labelId="status"
                      id="status"
                      value={field.value}
                      defaultValue={currentMerchant}
                      onChange={(data) => field.onChange(data)}
                    >
                      {merchantList.map((data) => (
                        <MenuItem key={data.ID} value={data.name}>
                          {data.name}
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
      </form>
    </div>
  );
}

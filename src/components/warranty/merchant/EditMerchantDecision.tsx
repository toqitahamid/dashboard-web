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
  currentMerchantDecision,
  warrantyId,
  setIsMerchantDecisionChanged,
  cookies,
}) {
  const [open, setOpen] = React.useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      merchant_decision: '',
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
        `http://localhost:20801/warranty/api/v1/warranty/update-merchant-decision/${warrantyId}`,
        {
          merchant_decision: values.merchant_decision,
        },
        config
      )
      .then(setIsMerchantDecisionChanged);
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
        {currentMerchantDecision === ''
          ? 'Click to enter decision'
          : currentMerchantDecision}
      </Button>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Merchant Decision
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="merchant_decision">Select an Option</InputLabel>
                <Controller
                  control={control}
                  name="merchant_decision"
                  render={({ field }) => (
                    <Select
                      labelId="merchant_decision"
                      id="merchant_decision"
                      value={field.value}
                      defaultValue={currentMerchantDecision}
                      onChange={(data) => field.onChange(data)}
                    >
                      <MenuItem value={'New Product Issued'}>
                        New Product Issued
                      </MenuItem>
                      <MenuItem value={'Old Product Returned'}>
                        Old Product Returned
                      </MenuItem>
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

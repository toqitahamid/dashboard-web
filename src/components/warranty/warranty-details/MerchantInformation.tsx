import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TableCell,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import EditProductReceivedDate from './EditProductReceivedDate';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditStatus from './EditStatus';
import EditMerchantName from '../merchant/EditMerchantName';
import EditSentToMerchant from '../merchant/EditSentToMerchant';
import EditSentDateToMerchant from '../merchant/EditSentDateToMerchant';
import EditReceivedDateFromMerchant from '../merchant/EditReceivedDateFromMerchant';
import EditMerchantDecision from '../merchant/EditMerchantDecision';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  breadcrumb: {
    paddingBottom: 18,
  },
  card: {
    marginTop: 18,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
  table: {
    flexGrow: 1,
    addingTop: 20,
  },
  formControl: {
    minWidth: 200,
  },
  saveButton: {
    padding: 18,
  },
}));

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

const MerchantInformation = ({ warrantyId }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (data) => console.log(data);

  const [merchantDetails, setMerchantDetails] = useState([]);
  const [sentToMerchant, setSentToMerchant] = useState();

  const [isSentToMerchantChanged, setIsSentToMerchantChanged] = useToggle();
  const [isMerchantChanged, setIsMerchantChanged] = useToggle();
  const [isSentDateToMerchantChanged, setIsSentDateToMerchantChange] =
    useToggle();
  const [
    isReceivedDateFromMerchantChanged,
    setIsReceivedDateFromMerchantChange,
  ] = useToggle();

  const [isMerchantDecisionChanged, setIsMerchantDecisionChanged] = useToggle();

  useEffect(() => {
    const warranties = async () => {
      const response = await axios(
        `http://localhost:20801/warranty/api/v1/warranty/getMerchantDetails/${warrantyId}`
      );
      setMerchantDetails(response.data.data);
      setSentToMerchant(merchantDetails.sent_to_merchant);
      console.log(response.data.data);
    };
    warranties();
  }, [
    isMerchantChanged,
    isSentToMerchantChanged,
    isSentDateToMerchantChanged,
    isReceivedDateFromMerchantChanged,
    isMerchantDecisionChanged,
  ]);

  // useEffect(() => {
  //   const warranties = async () => {
  //     const response = await axios(
  //       `http://localhost:20801/warranty/api/v1/warranty/getWarrantyDetails/${warrantyId}`
  //     );
  //     setWarrantyDetails(response.data.data);
  //     console.log(response.data.data);
  //   };
  //   warranties();
  // }, [isDateChanged]);

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Merchant
              </TableCell>
              <TableCell component="th" scope="row">
                <EditMerchantName
                  currentMerchant={merchantDetails.merchant_name}
                  warrantyId={warrantyId}
                  setIsMerchantChanged={setIsMerchantChanged}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Sent to Merchant
              </TableCell>
              <TableCell component="th" scope="row">
                <EditSentToMerchant
                  currentSentToMerchant={merchantDetails.sent_to_merchant}
                  warrantyId={warrantyId}
                  setIsSentToMerchantChanged={setIsSentToMerchantChanged}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Date sent to Merchant
              </TableCell>
              <TableCell component="th" scope="row">
                <EditSentDateToMerchant
                  currentSentDateToMerchant={
                    merchantDetails.product_sent_date_to_merchant
                  }
                  setIsSentDateToMerchantChanged={setIsSentDateToMerchantChange}
                  warrantyId={warrantyId}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Date received from Merchant
              </TableCell>
              <TableCell component="th" scope="row">
                <EditReceivedDateFromMerchant
                  currentReceivedDateFromMerchant={
                    merchantDetails.product_received_date_from_merchant
                  }
                  warrantyId={warrantyId}
                  setIsReceivedDateFromMerchantChanged={
                    setIsReceivedDateFromMerchantChange
                  }
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Merchant Decision
              </TableCell>
              <TableCell component="th" scope="row">
                <EditMerchantDecision
                  currentMerchantDecision={merchantDetails.merchant_decision}
                  warrantyId={warrantyId}
                  setIsMerchantDecisionChanged={setIsMerchantDecisionChanged}
                />
              </TableCell>
            </TableRow>

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <FormControl className={classes.formControl}>*/}
            {/*      <Select*/}
            {/*        labelId="demo-simple-select-label"*/}
            {/*        id="demo-simple-select"*/}
            {/*      >*/}
            {/*        <MenuItem value={0}>Mpow</MenuItem>*/}
            {/*        <MenuItem value={1}>Star Tech</MenuItem>*/}
            {/*        <MenuItem value={2}>Style Merchandise</MenuItem>*/}
            {/*        <MenuItem value={3}>Raiyan</MenuItem>*/}
            {/*        <MenuItem value={4}>Open Source</MenuItem>*/}
            {/*        <MenuItem value={5}>Newaz</MenuItem>*/}
            {/*        <MenuItem value={6}>Mollah Telecom</MenuItem>*/}
            {/*        <MenuItem value={7}>Mohaz Telecom</MenuItem>*/}
            {/*        <MenuItem value={8}>Shamim</MenuItem>*/}
            {/*        <MenuItem value={8}> Ashraf International</MenuItem>*/}
            {/*        <MenuItem value={9}> Anker</MenuItem>*/}
            {/*        <MenuItem value={10}> Motion View</MenuItem>*/}
            {/*        <MenuItem value={11}>BM</MenuItem>*/}
            {/*        <MenuItem value={11}>Studio Mason</MenuItem>*/}
            {/*        <MenuItem value={11}>mShop</MenuItem>*/}
            {/*        <MenuItem value={11}>Lite Electronics</MenuItem>*/}
            {/*        <MenuItem value={11}>MH Telecom</MenuItem>*/}
            {/*        <MenuItem value={11}>AIIM Global</MenuItem>*/}
            {/*      </Select>*/}
            {/*    </FormControl>*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Sent to Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <FormControl className={classes.formControl}>*/}
            {/*      <Select*/}
            {/*        labelId="demo-simple-select-label"*/}
            {/*        id="demo-simple-select"*/}
            {/*      >*/}
            {/*        <MenuItem value={0}>Yes</MenuItem>*/}
            {/*        <MenuItem value={1}>No</MenuItem>*/}
            {/*      </Select>*/}
            {/*    </FormControl>*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Date sent to Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
            {/*      /!*<Grid container justifyContent="space-around">*!/*/}
            {/*      <KeyboardDatePicker*/}
            {/*        disableToolbar*/}
            {/*        variant="inline"*/}
            {/*        format="MM/dd/yyyy"*/}
            {/*        margin="normal"*/}
            {/*        id="date-picker-inline"*/}
            {/*        label="Date picker inline"*/}
            {/*        value={selectedDate}*/}
            {/*        onChange={handleDateChange}*/}
            {/*        KeyboardButtonProps={{*/}
            {/*          'aria-label': 'change date',*/}
            {/*        }}*/}
            {/*      />*/}
            {/*      /!*</Grid>*!/*/}
            {/*    </MuiPickersUtilsProvider>*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Date Recieved from Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
            {/*      /!*<Grid container justifyContent="space-around">*!/*/}
            {/*      <KeyboardDatePicker*/}
            {/*        disableToolbar*/}
            {/*        variant="inline"*/}
            {/*        format="MM/dd/yyyy"*/}
            {/*        margin="normal"*/}
            {/*        id="date-picker-inline"*/}
            {/*        label="Date picker inline"*/}
            {/*        value={selectedDate}*/}
            {/*        onChange={handleDateChange}*/}
            {/*        KeyboardButtonProps={{*/}
            {/*          'aria-label': 'change date',*/}
            {/*        }}*/}
            {/*      />*/}
            {/*      /!*</Grid>*!/*/}
            {/*    </MuiPickersUtilsProvider>*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Feedback from Merchant*/}
            {/*  </TableCell>*/}

            {/*  <TableCell component="th" scope="row">*/}
            {/*    <FormControl className={classes.formControl}>*/}
            {/*      <Select*/}
            {/*        labelId="demo-simple-select-label"*/}
            {/*        id="demo-simple-select"*/}
            {/*      >*/}
            {/*        <MenuItem value={0}>New Product Issued</MenuItem>*/}
            {/*        <MenuItem value={1}>Fixed the product</MenuItem>*/}
            {/*      </Select>*/}
            {/*    </FormControl>*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MerchantInformation;

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { Paper, TableCell } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import EditMerchantName from '../merchant/EditMerchantName';
import EditSentToMerchant from '../merchant/EditSentToMerchant';
import EditReceivedDateFromMerchant from '../merchant/EditReceivedDateFromMerchant';
import EditMerchantDecision from '../merchant/EditMerchantDecision';
import dayjs from 'dayjs';
import EditSentDateToMerchant from '../merchant/EditSentDateToMerchant';

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

const MerchantInformation = ({ warrantyId, cookies }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    console.log(date);
    var a = { expiry: dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') };
    console.log(a);
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

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  useEffect(() => {
    const warranties = async () => {
      const response = await axios(
        `https://api.penguin.com.bd/warranty/api/v1/warranty/getMerchantDetails/${warrantyId}`,
        config
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
    <Paper>
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
                  cookies={cookies}
                />
              </TableCell>
            </TableRow>

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Sent to Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <EditSentToMerchant*/}
            {/*      currentSentToMerchant={merchantDetails.sent_to_merchant}*/}
            {/*      warrantyId={warrantyId}*/}
            {/*      setIsSentToMerchantChanged={setIsSentToMerchantChanged}*/}
            {/*      cookies={cookies}*/}
            {/*    />*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Date sent to Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <EditSentDateToMerchant*/}
            {/*      currentSentDateToMerchant={*/}
            {/*        merchantDetails.product_sent_date_to_merchant*/}
            {/*      }*/}
            {/*      setIsSentDateToMerchantChanged={setIsSentDateToMerchantChange}*/}
            {/*      warrantyId={warrantyId}*/}
            {/*      cookies={cookies}*/}
            {/*    />*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            {/*<TableRow>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    Date received from Merchant*/}
            {/*  </TableCell>*/}
            {/*  <TableCell component="th" scope="row">*/}
            {/*    <EditReceivedDateFromMerchant*/}
            {/*      currentReceivedDateFromMerchant={*/}
            {/*        merchantDetails.product_received_date_from_merchant*/}
            {/*      }*/}
            {/*      warrantyId={warrantyId}*/}
            {/*      setIsReceivedDateFromMerchantChanged={*/}
            {/*        setIsReceivedDateFromMerchantChange*/}
            {/*      }*/}
            {/*      cookies={cookies}*/}
            {/*    />*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}

            <TableRow>
              <TableCell component="th" scope="row">
                Merchant Decision
              </TableCell>
              <TableCell component="th" scope="row">
                <EditMerchantDecision
                  currentMerchantDecision={merchantDetails.merchant_decision}
                  warrantyId={warrantyId}
                  setIsMerchantDecisionChanged={setIsMerchantDecisionChanged}
                  cookies={cookies}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MerchantInformation;

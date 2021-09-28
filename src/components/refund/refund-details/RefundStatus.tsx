import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { Button, Paper, TableCell } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import useSWR from 'swr';
import { Skeleton } from '@material-ui/lab';
import EditRefundStatus from './EditRefundStatus';
import BkashRefund from './BkashRefund';
import BkashRefundStatus from './BkashRefundStatus';

const useStyles = makeStyles((theme) => ({
  table: {
    flexGrow: 1,
    addingTop: 20,
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

const RefundStatus = ({ refundID, cookies }) => {
  const classes = useStyles();

  const onSubmit = (data) => console.log(data);
  const [isDateChanged, setIsDateChanged] = useToggle();

  const [isStatusChanged, setIsStatusChanged] = useToggle();

  const [isReasonChanged, setIsReasonChanged] = useToggle();

  const [warrantyDetails, setWarrantyDetails] = useState([]);
  const [refundStatusDetails, setRefundStatusDetails] = useState();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `http://localhost:20802/refund/api/v1/refund/get-refund-details/${refundID}`,
    fetcher
  );

  if (error) return <div>Loading</div>;
  if (!data)
    return (
      <div>
        <Skeleton />
      </div>
    );

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {data.data.payment_gateway == 'bKash' ? (
              <TableRow>
                <TableCell component="th" scope="row">
                  bKash Refund Status
                </TableCell>

                <TableCell component="th" scope="row">
                  {/*<Button variant="outlined">Refund</Button>*/}
                  <BkashRefundStatus
                    setRefundStatusDetails={setRefundStatusDetails}
                    cookies={cookies}
                  />
                </TableCell>
              </TableRow>
            ) : null}

            {refundStatusDetails != null ? (
              <>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Completed Time
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.completedTime}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Original Transaction ID
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.originalTrxID}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Refund Transaction ID
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.refundTrxID}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Transaction Status
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.transactionStatus}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Amount
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.amount}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Charge
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {refundStatusDetails.data.charge}
                  </TableCell>
                </TableRow>
              </>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RefundStatus;

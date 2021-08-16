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

const RefundInformation = ({ refundID, cookies }) => {
  const classes = useStyles();

  const onSubmit = (data) => console.log(data);
  const [isDateChanged, setIsDateChanged] = useToggle();

  const [isStatusChanged, setIsStatusChanged] = useToggle();

  const [isReasonChanged, setIsReasonChanged] = useToggle();

  const [warrantyDetails, setWarrantyDetails] = useState([]);

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

  console.log(data);

  // useEffect(() => {
  //   const warranties = async () => {
  //     const response = await axios(
  //       `http://localhost:20801/warranty/api/v1/warranty/getWarrantyDetails/${warrantyId}`,
  //       config
  //     );
  //     setWarrantyDetails(response.data.data);
  //     console.log(response.data.data);
  //   };
  //   warranties();
  // }, [isStatusChanged, isDateChanged, isReasonChanged]);

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Refund Type
              </TableCell>
              <TableCell component="th" scope="row">
                {data.data.refund_type}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Refund Amount
              </TableCell>
              <TableCell component="th" scope="row">
                {data.data.refund_amount}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Refund Status
              </TableCell>

              <TableCell>
                {/*{data.data.refund_status}*/}
                <EditRefundStatus
                  currentStatus={data.data.refund_status}
                  refundID={refundID}
                  setIsStatusChanged={setIsStatusChanged}
                  cookies={cookies}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Payment Gateway
              </TableCell>

              <TableCell component="th" scope="row">
                {data.data.payment_gateway}
              </TableCell>
            </TableRow>

            {data.data.payment_gateway == 'bKash' ? (
              <TableRow>
                <TableCell component="th" scope="row">
                  bKash Refund
                </TableCell>

                <TableCell component="th" scope="row">
                  <Button variant="outlined">Refund</Button>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RefundInformation;

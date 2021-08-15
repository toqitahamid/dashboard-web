import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { Paper, TableCell } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

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

const RefundInformation = ({ warrantyId, cookies }) => {
  const classes = useStyles();

  const onSubmit = (data) => console.log(data);
  const [isDateChanged, setIsDateChanged] = useToggle();

  const [isStatusChanged, setIsStatusChanged] = useToggle();

  const [isReasonChanged, setIsReasonChanged] = useToggle();

  const [warrantyDetails, setWarrantyDetails] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

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
                Refund ID
              </TableCell>
              <TableCell component="th" scope="row">
                {/*{warrantyDetails.warranty_type}*/}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Refund Type
              </TableCell>
              <TableCell component="th" scope="row">
                {/*{warrantyDetails.warranty_type}*/}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Status
              </TableCell>

              <TableCell>
                {/*<EditStatus*/}
                {/*  currentStatus={warrantyDetails.status}*/}
                {/*  warrantyId={warrantyId}*/}
                {/*  setIsStatusChanged={setIsStatusChanged}*/}
                {/*  cookies={cookies}*/}
                {/*/>*/}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Refund Request Date
              </TableCell>

              <TableCell component="th" scope="row">
                {/*<EditProductReceivedDate*/}
                {/*  currentDate={warrantyDetails.product_received_date}*/}
                {/*  warrantyId={warrantyId}*/}
                {/*  setIsDateChanged={setIsDateChanged}*/}
                {/*  cookies={cookies}*/}
                {/*/>*/}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RefundInformation;

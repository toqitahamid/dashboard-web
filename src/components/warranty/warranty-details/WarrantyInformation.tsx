import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid, IconButton, TableCell } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import EditWarranty from './EditWarranty';
import { AddShoppingCart } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import EditStatus from './EditStatus';

import EditProductReceivedDate from './EditProductReceivedDate';
import EditWarrantyReason from './EditWarrantyReason';

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

const WarrantyInformation = ({ warrantyId }) => {
  const classes = useStyles();

  const onSubmit = (data) => console.log(data);
  const [isDateChanged, setIsDateChanged] = useToggle();

  const [isStatusChanged, setIsStatusChanged] = useToggle();

  const [isReasonChanged, setIsReasonChanged] = useToggle();

  const [warrantyDetails, setWarrantyDetails] = useState([]);

  useEffect(() => {
    const warranties = async () => {
      const response = await axios(
        `http://localhost:20801/warranty/api/v1/warranty/getWarrantyDetails/${warrantyId}`
      );
      setWarrantyDetails(response.data.data);
      console.log(response.data.data);
    };
    warranties();
  }, [isStatusChanged, isDateChanged, isReasonChanged]);

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Warranty Reason
              </TableCell>
              <TableCell component="th" scope="row">
                <EditWarrantyReason
                  currentReason={warrantyDetails.warranty_reason}
                  warrantyId={warrantyId}
                  setIsReasonChanged={setIsReasonChanged}
                />
                {/*{warrantyDetails.warranty_reason}*/}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Warranty Type
              </TableCell>
              <TableCell component="th" scope="row">
                {warrantyDetails.warranty_type}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Status
              </TableCell>

              <TableCell>
                <EditStatus
                  currentStatus={warrantyDetails.status}
                  warrantyId={warrantyId}
                  setIsStatusChanged={setIsStatusChanged}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Product received Date
              </TableCell>

              <TableCell component="th" scope="row">
                <EditProductReceivedDate
                  currentDate={warrantyDetails.product_received_date}
                  warrantyId={warrantyId}
                  setIsDateChanged={setIsDateChanged}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WarrantyInformation;

import {
  Card,
  CardContent,
  Divider,
  Paper,
  TableCell,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import axios from 'axios';

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
  paper: {
    padding: 16,
  },
}));

const OrderInformation = ({ refundId, cookies }) => {
  const classes = useStyles();
  const [orderDetails, setOrderDetails] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  useEffect(() => {
    const orders = async () => {
      const response = await axios(
        `http://localhost:20802/refund/api/v1/order/get-order-details/${refundId}`
      );
      setOrderDetails(response.data.data);
      console.log(response.data.data);
    };
    orders();
  }, [refundId]);

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

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
                {orderDetails.refund_id}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Refund Request Date
              </TableCell>
              <TableCell component="th" scope="row">
                {formatDate(orderDetails.refund_request_date)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Order ID
              </TableCell>
              <TableCell component="th" scope="row">
                {orderDetails.woo_order_id}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Customer Name
              </TableCell>
              <TableCell component="th" scope="row">
                {orderDetails.customer_name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Customer Phone
              </TableCell>
              <TableCell component="th" scope="row">
                {orderDetails.customer_phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderInformation;

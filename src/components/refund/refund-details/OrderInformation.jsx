import { Paper, TableCell } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import axios from 'axios';
import useSWR from 'swr';

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

  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR(
    `http://localhost:20802/refund/api/v1/order/get-order-details/${refundId}`,
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading...</div>;
  //
  // useEffect(() => {
  //   const orders = async () => {
  //     const response = await axios(
  //       `http://localhost:20802/refund/api/v1/order/get-order-details/${refundId}`
  //     );
  //     setOrderDetails(response.data.data);
  //     console.log(response.data.data);
  //   };
  //   orders();
  // }, [refundId]);

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Order ID
              </TableCell>
              <TableCell component="th" scope="row">
                {data.data.woo_order_id}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Customer Name
              </TableCell>
              <TableCell component="th" scope="row">
                {data.data.customer_name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Customer Phone
              </TableCell>
              <TableCell component="th" scope="row">
                {data.data.customer_phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderInformation;

import { Card, CardContent, Divider, TableCell } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

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

const OrderInformation = ({ data }) => {
  const classes = useStyles();

  // console.log(data);

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              RMA ID
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.rma_id}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              RMA Create Date
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.rma_creation_date}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Order ID
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.order_id}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Product Name
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.product_name}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              SKU
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.product_sku}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderInformation;

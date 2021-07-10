import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  editIcon: {
    paddingRight: 0,
  },
});

function createData(rma, orderID, customerName, status, refundRequestDate) {
  return { rma, orderID, customerName, status, refundRequestDate };
}

const rows = [
  createData(
    'RMA-111',
    30159,
    'Toqi Tahamid Sarker',
    'New Request',
    '5 July 2021'
  ),
  createData(
    'RMA-111',
    30237,
    'Amit Iqbal',
    'Pickup Request from Pathao',
    '5 July 2021'
  ),
  createData(
    'RMA-111',
    30262,
    'Ahmed Ahnaf',
    'Recieved from Pathao',
    '4 July 2021'
  ),
  createData(
    'RMA-111',
    30305,
    'Asifur Rahman',
    'In-house Checking',
    '3 July 2021'
  ),
  createData('RMA-111', 30356, 'Bashir Ahmed', 'New Request', '1 July 2021'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RMA ID</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Refund Request Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rma}>
              <TableCell component="th" scope="row">
                <a>{row.rma}</a>
              </TableCell>
              <TableCell>{row.orderID}</TableCell>
              <TableCell align="right">{row.customerName}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.refundRequestDate}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <EditIcon className={classes.editIcon} />
                </IconButton>
                <Link href="/warranty/warrantyID">
                  <IconButton aria-label="arrow">
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

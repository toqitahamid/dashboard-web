import { Chip, IconButton, Paper } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useCallback, useEffect, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table/Table';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  editIcon: {
    paddingRight: 0,
  },
});

const UserDetails = ({ cookies, id }) => {
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const fetcher = (url) => fetch(url, config).then((res) => res.json());
  const { data, error } = useSWR(`http://localhost:20803/user/${id}`, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              ID
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.rawId}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.displayName}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Email
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.email}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Custom Claims
            </TableCell>
            <TableCell component="th" scope="row">
              {data.data.CustomClaims == null ? (
                <div>No custom role</div>
              ) : data.data.CustomClaims.admin ? (
                <div>Admin</div>
              ) : data.data.CustomClaims.storeManager ? (
                <div>Store Manager</div>
              ) : data.data.CustomClaims.storeSupport ? (
                <div>Store Support</div>
              ) : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDetails;

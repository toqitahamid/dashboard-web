import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import useSWR from 'swr';
import { Skeleton } from '@material-ui/lab';
import dayjs from 'dayjs';
import { Chip, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useRouter } from 'next/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: 200,
    height: 300,
  },
}));

const RefundListTable = ({ cookies }) => {
  const router = useRouter();
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  // const fetcher = (url) => fetch(url).then((res) => res.json());

  const fetcher = async (url) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR(
    'http://localhost:20802/refund/api/v1/refund/get-refund-list',
    fetcher
  );

  if (error) return <div>Add new refund to see the table</div>;
  if (!data)
    return (
      <div>
        <Skeleton />
      </div>
    );

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  const columns = [
    {
      name: 'order_id',
      label: 'Order ID',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'customer_name',
      label: 'Customer Name',
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: 'gateway_name',
      label: 'Payment Gateway',
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: 'refund_status',
      label: 'Refund Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Chip variant="outlined" size="small" label={value} />
        ),
      },
    },
    {
      name: 'refund_request_date',
      label: 'Refund Request Date',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => formatDate(value),
      },
    },

    {
      name: 'refund_id',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <IconButton
            aria-label="arrow"
            onClick={() => router.push(`/refund/refund-details/${value}`)}
          >
            <ArrowForwardIcon />
          </IconButton>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
  };

  return (
    <>
      <MUIDataTable data={data.data} columns={columns} options={options} />
    </>
  );
};

export default RefundListTable;

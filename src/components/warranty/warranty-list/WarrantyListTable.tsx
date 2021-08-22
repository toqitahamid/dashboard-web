import dayjs from 'dayjs';
import { Chip, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';

const WarrantyListTable = ({ cookies }) => {
  const router = useRouter();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR(
    'https://api.penguin.com.bd/warranty/api/v1/warranty/getWarrantyList',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  const ActionButton = (value) => {
    return (
      <IconButton
        aria-label="arrow"
        onClick={() => router.push(`/warranty/warranty-details/${value}`)}
      >
        <ArrowForwardIcon />
      </IconButton>
    );
  };

  const StatusChip = (value) => {
    return <Chip variant="outlined" size="small" label={value} />;
  };

  const columns = [
    {
      name: 'rma_id',
      label: 'RMA ID',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'order_id',
      label: 'Order ID',
      options: {
        filter: false,
        sort: false,
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
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => StatusChip(value),
      },
    },
    {
      name: 'rma_creation_date',
      label: 'RMA Creation Date',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => formatDate(value),
      },
    },
    {
      name: 'warranty_id',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          ActionButton(value),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
  };

  return (
    <>
      {data.data != null ? (
        <MUIDataTable data={data.data} columns={columns} options={options} />
      ) : null}
    </>
  );
};

export default WarrantyListTable;

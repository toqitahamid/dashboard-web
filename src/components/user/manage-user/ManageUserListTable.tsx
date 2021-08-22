import dayjs from 'dayjs';
import { Chip, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';

const ManageUserListTable = ({ cookies }) => {
  const router = useRouter();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR('http://localhost:20803/users', fetcher);

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
        onClick={() => router.push(`/user/user-details/${value}`)}
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
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'rawId',
      label: 'User ID',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'displayName',
      label: 'Display Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'rawId',
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
      {data != null ? (
        <MUIDataTable data={data} columns={columns} options={options} />
      ) : null}
    </>
  );
};

export default ManageUserListTable;

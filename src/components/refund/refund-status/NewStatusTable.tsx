import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../../../firebaseAdmin';
import NavBar from '../../../components/navigation/navbar/NavBar';
import { makeStyles } from '@material-ui/styles';
import {
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';

import MUIDataTable from 'mui-datatables';
import useSWR from 'swr';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import dayjs from 'dayjs';

const drawerWidth = 240;
// @ts-ignore

const Index = ({ cookies, token }) => {
  const router = useRouter();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'http://localhost:20802/refund/api/v1/refund-status',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  const columns = [
    {
      name: 'ID',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Refund Status',
      options: {
        filter: false,
        sort: false,
      },
    },
    // {
    //   name: 'ID',
    //   label: 'Action',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <IconButton
    //         aria-label="arrow"
    //         onClick={() => router.push(`/refund/warranty-details/${value}`)}
    //       >
    //         <ArrowForwardIcon />
    //       </IconButton>
    //     ),
    //   },
    // },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
  };

  return <MUIDataTable data={data.data} columns={columns} options={options} />;
};
export default Index;

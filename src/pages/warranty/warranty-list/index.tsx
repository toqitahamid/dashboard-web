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
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
  newWarranty: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  table: {
    flexGrow: 1,
    paddingTop: 20,
  },
  status: {
    padding: 10,
  },
  warrantySearch: {
    padding: 30,
  },
}));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      // props: { login: `Your email is ${email} and your UID is ${uid}.` },
      props: { cookies, token },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

const WarrantyList = ({ cookies, token }) => {
  const router = useRouter();
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR(
    'http://localhost:20801/warranty/api/v1/warranty/getWarrantyList',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  // if (!data) return <div>Loading...</div>;

  // console.log(data);

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

  const Breadcrumb = () => {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/dashboard">
          Home
        </Link>
        <Typography color="textPrimary">Warranty</Typography>
      </Breadcrumbs>
    );
  };

  const NewWarranty = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/warranty/new-warranty')}
      >
        + New Warranty
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={4} token={token} />

      <div className={classes.content}>
        <div>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Warranty List
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Breadcrumb />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            className={classes.newWarranty}
          >
            <Grid item>
              <NewWarranty />
            </Grid>
          </Grid>
        </div>

        {data ? (
          <MUIDataTable data={data.data} columns={columns} options={options} />
        ) : null}
      </div>
    </div>
  );
};
export default WarrantyList;

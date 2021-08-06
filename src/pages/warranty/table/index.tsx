import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../../../firebaseAdmin';
import NavBar from '../../../components/NavBar';
import { makeStyles } from '@material-ui/styles';
import {
  Breadcrumbs,
  Button,
  Grid,
  Paper,
  Switch,
  TextField,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import WarrantyTable from '../../../components/warranty/WarrantyTable';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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
      props: {},
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

const fetcher = (url) => fetch(url).then((res) => res.json());

const Index = () => {
  const router = useRouter();
  const classes = useStyles();

  const { data, error } = useSWR(
    'http://localhost:20801/warranty/api/v1/warranty/getWarrantyList',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  console.log(data);

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
      <NavBar selectedListItem={4} />

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

        {/*<div style={{ maxWidth: '100%' }}>*/}
        <Paper variant="outlined">
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'RMA ID', field: 'rma_id' },
              { title: 'Order ID', field: 'order_id' },
              { title: 'Customer_Name', field: 'customer_name' },
              {
                title: 'Status',
                field: 'status',
              },
              { title: 'RMA Create Date', field: 'rma_creation_date' },
            ]}
            // data={[
            //   {
            //     rma_id: 'Mehmet',
            //     order_id: 'Baran',
            //     customer_name: '1987',
            //     status: '63',
            //     rma_creation_date: 'ok',
            //   },
            // ]}
            data={data.data}
            title="Demo Title"
          />
        </Paper>
        {/*</div>*/}

        {/*<div className={classes.table}>*/}
        {/*  <Paper variant="outlined">*/}
        {/*    <Grid*/}
        {/*      container*/}
        {/*      spacing={2}*/}
        {/*      direction="row"*/}
        {/*      justifyContent="flex-start"*/}
        {/*      alignItems="center"*/}
        {/*    >*/}
        {/*      <div className={classes.warrantySearch}>*/}
        {/*        <Grid item>*/}
        {/*          <TextField*/}
        {/*            id="outlined-basic"*/}
        {/*            label="Outlined"*/}
        {/*            variant="outlined"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*      </div>*/}

        {/*      <Grid item>*/}
        {/*        <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />*/}
        {/*      </Grid>*/}
        {/*      <Grid item className={classes.status}>*/}
        {/*        <Typography variant="body1" gutterBottom>*/}
        {/*          Refunded*/}
        {/*        </Typography>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}

        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item lg={12}>*/}
        {/*    <WarrantyTable data={data.data} />*/}
        {/*    /!*<NewTable />*!/*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/*</Paper>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
export default Index;

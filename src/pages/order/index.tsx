import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../../firebaseAdmin';
import NavBar from '../../components/navigation/navbar/NavBar';
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
// import NewWarranty from './new-warranty';
// import BasicTable from '../../components/warranty/Table';

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

const Order = ({ cookies, token }) => {
  const router = useRouter();
  const classes = useStyles();

  const Breadcrumb = () => {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/dashboard">
          Home
        </Link>
        <Typography color="textPrimary">Order</Typography>
      </Breadcrumbs>
    );
  };

  const NewOrder = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('order/new-order')}
      >
        + New Order
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={2} token={token} />

      {token.admin ? (
        <div className={classes.content}>
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Order List
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
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
              className={classes.newWarranty}
            >
              <Grid item>
                <NewOrder />
              </Grid>
            </Grid>
          </div>

          <div className={classes.table}>
            <Paper variant="outlined">
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <div className={classes.warrantySearch}>
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                  </Grid>
                </div>

                <Grid item>
                  <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid item className={classes.status}>
                  <Typography variant="body1" gutterBottom>
                    Refunded
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item lg={12}>
                  {/*<BasicTable />*/}
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Order;

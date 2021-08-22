import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../../../firebaseAdmin';
import NavBar from '../../../components/navigation/navbar/NavBar';
import { makeStyles } from '@material-ui/styles';
import { Breadcrumbs, Button, Grid } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import WarrantyListTable from '../../../components/warranty/warranty-list/WarrantyListTable';
import ManageUserListTable from '../../../components/user/manage-user/ManageUserListTable';
import NewUser from '../../../components/user/manage-user/NewUser';
import UpdateUser from '../../../components/user/manage-user/UpdateUser';
import CustomClaims from '../../../components/user/manage-user/CustomClaims';

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

const ManageUser = ({ cookies, token }) => {
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
        <Typography color="textPrimary">User</Typography>
      </Breadcrumbs>
    );
  };

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={14} token={token} />

      <div className={classes.content}>
        <div>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                User List
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
            spacing={6}
            className={classes.newWarranty}
          >
            <Grid item>
              <NewUser cookies={cookies} />
            </Grid>

            <Grid item>
              <UpdateUser cookies={cookies} />
            </Grid>

            <Grid item>
              <CustomClaims cookies={cookies} />
            </Grid>
          </Grid>
        </div>

        <ManageUserListTable cookies={cookies} />

        {/*{data.data != null ? (*/}
        {/*  <MUIDataTable data={data.data} columns={columns} options={options} />*/}
        {/*) : null}*/}
      </div>
    </div>
  );
};
export default ManageUser;

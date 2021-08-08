import React from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { firebaseAdmin } from '../../firebaseAdmin';

import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import NavBar from '../components/NavBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
}));

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // const { uid, email } = token;

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

function AuthenticatedDashboard({ cookies, token }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <NavBar selectedListItem={0} token={token} />

        <main className={classes.content}>
          <Typography paragraph>Content</Typography>
        </main>
      </div>
    </>
  );
}

export default AuthenticatedDashboard;

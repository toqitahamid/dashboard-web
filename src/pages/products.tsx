import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import NavBar from '../components/NavBar';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Link from 'next/link';

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
      props: {}
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
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};



const Products = ( ) => {

  const classes = useStyles();

  return(
    <div  className={classes.root}>
      <NavBar selectedListItem={1}/>
      <main className={classes.content}>

        <Link href={"/new-product"} passHref>
          <Button variant="contained" color="primary">
          + New Product
        </Button>
          </Link>

      </main>
    </div>
  );
}
export default Products;


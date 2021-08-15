import React, { useState } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import { GetServerSidePropsContext } from 'next';
import NavBar from '../components/navigation/navbar/NavBar';
import { makeStyles } from '@material-ui/styles';
import useSWR from 'swr';
import { Card, CardContent, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
}));

export const getServerSideProps = async (ctx) => {
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
      props: {},
    };
  }
};

function AuthenticatedDashboard({ cookies, token }) {
  const classes = useStyles();

  const [statusData, setStatusData] = useState();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR(
    'http://localhost:20801/warranty/api/v1/status/getWarrantyCountByStatusName',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  // if (!data) return <div>Loading...</div>;

  // console.log(data.data);

  // useEffect(() => {
  //   const warranties = async () => {
  //     const response = await axios(
  //       `http://localhost:20801/warranty/api/v1/status/getWarrantyCountByStatusName`,
  //       config
  //     );
  //     setStatusData(response.data.data);
  //     console.log(response.data.data);
  //   };
  //   warranties();
  // }, []);

  return (
    <>
      <div className={classes.root}>
        <NavBar selectedListItem={0} token={token} />

        <main className={classes.content}>
          {data == [] ? (
            <Grid container spacing={10}>
              {data.data.map((status) => (
                <Grid item xs={6} key={status.id}>
                  <Card>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {status.status}
                      </Typography>
                      <Typography variant="h5" component="h2" color="primary">
                        {status.warranty_counts}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default AuthenticatedDashboard;

import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import NavBar from '../components/NavBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { firebaseClient } from '../../firebaseClient';
import axios from 'axios';
import useSWR from 'swr';
import { useAuth } from '../../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    console.log(`Hello: ${cookies.token}`);

    // the user is authenticated!
    // FETCH STUFF HERE

    axios
      .get('http://127.0.0.1:20801/warranty/api/v1/products', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

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

const NewProducts = () => {
  const classes = useStyles();
  const { userToken } = useAuth();

  // const fetcher = url => axios.get(url).then(res => res.data)

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      price: '',
      warranty_period: '',
    },
  });

  const onSubmit = async (values) => {
    // console.log(values)
    // const { data, error } = useSWR('http://localhost:8080/products', fetcher)
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .post(
        'http://localhost:20801/warranty/api/v1/products',
        {
          title: values.title,
          price: parseFloat(values.price),
          warranty_period: parseInt(values.warranty_period),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //   axios({
    //     method: 'post',
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //       'Content-Type': 'application/json'
    //     },
    //     url: 'http://localhost:20801/warranty/api/v1/products',
    //     data: JSON.stringify({
    //       title: values.title,
    //       price: values.price,
    //       warranty_period: values.warranty_period
    //     })
    //   });
  };

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={1} />
      <main className={classes.content}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // id="email"
                label="Product Name"
                // name="email"
                // autoComplete="email"
                // autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // id="password"
                label="Price"
                // name="password"
                // autoComplete="current-password"
                // autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="warranty_period"
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // id="password"
                label="Index Period"
                // name="password"
                // autoComplete="current-password"
                // autoFocus
              />
            )}
          />

          {/*<FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember Me"/>*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            + Create Product
          </Button>
        </form>
      </main>
    </div>
  );
};

export default NewProducts;

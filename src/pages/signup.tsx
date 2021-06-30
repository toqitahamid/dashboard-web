import React from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Controller, useForm } from 'react-hook-form';
import { firebaseClient } from '../../firebaseClient';

const useStyle = makeStyles((theme) => ({
  paper: {
    paddingTop: "100px",
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar:{
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }

}))

const Login = () => {
  const classes = useStyle();

  const {handleSubmit, control} = useForm({
    defaultValues: {
      email:"",
      password: ""
    }
  });

  // const onSubmit = async (values) => {
  //   await firebaseClient.auth().signInWithEmailAndPassword(values.email, values.password);
  //   window.location.href = 'dashboard';
  // }

  const onSubmit = async (values) => {
    await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
    window.location.href = 'dashboard';
  }



  //
  //
  // const onSubmit = () => async () => {
  //   await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
  //   console.log(email)
  //   window.location.href = 'dashboard';
  // }


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
        <Grid>

        </Grid>
          <Controller
            control={control}
            name="email"
            render={({field}) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // id="email"
                label="Email Address"
                // name="email"
                // autoComplete="email"
                // autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field}) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                // id="password"
                label="Password"
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
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
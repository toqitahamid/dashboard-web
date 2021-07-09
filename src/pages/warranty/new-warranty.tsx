import React, { useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../../firebaseAdmin';
import NavBar from '../../components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import MultiStep from '../../components/warranty/MultiStep';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ReactHookFormStepper from '../../components/warranty/ReactHookFormStepper';

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

    // console.log(`Hello: ${cookies.token}`)

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

const NewWarranty = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={3} />
      <div className={classes.content}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/*  <BasicDatePicker />*/}
          {/*<MultiStep />*/}
          <ReactHookFormStepper />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

export default NewWarranty;

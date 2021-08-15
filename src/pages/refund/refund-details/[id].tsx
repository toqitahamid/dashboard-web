import nookies from 'nookies';
import { firebaseAdmin } from '../../../../firebaseAdmin';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Tab,
  Tabs,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import NavBar from '../../../components/navigation/navbar/NavBar';
import PropTypes from 'prop-types';
import OrderInformation from '../../../components/refund/refund-details/OrderInformation';
import RefundInformation from '../../../components/refund/refund-details/RefundInformation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  breadcrumb: {
    paddingBottom: 18,
  },
  card: {
    marginTop: 18,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
  },
  table: {
    flexGrow: 1,
    addingTop: 20,
  },
  formControl: {
    minWidth: 200,
  },
  saveButton: {
    padding: 18,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box p={3}>{children}</Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Id = ({ cookies, token }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const [value, setValue] = React.useState(0);

  // const fetcher = (url) =>
  //   fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${cookies.token}`,
  //     },
  //   }).then((res) => res.json());
  // const { data, error } = useSWR(
  //   `http://localhost:20801/refund/api/v1/order/get-order-details/${id}`,
  //   fetcher
  // );
  //
  // if (error) return <div>'An error has occurred.'</div>;
  // if (!data) return <div>'Loading...'</div>;
  // console.log(data.data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Link color="inherit" href="/refund/refund-list">
          Refund
        </Link>
        <Typography color="textPrimary">Refund Details</Typography>
      </Breadcrumbs>
    );
  };

  // @ts-ignore
  return (
    <div className={classes.root}>
      <NavBar selectedListItem={9} token={token} />

      <div className={classes.content}>
        <div className={classes.breadcrumb}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Refund
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Breadcrumb />
            </Grid>
          </Grid>
        </div>

        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Order" {...a11yProps(0)} />
            <Tab label="Refund" {...a11yProps(1)} />
            {/*<Tab label="Merchant" {...a11yProps(2)} />*/}
            {/*<Tab label="Status History" {...a11yProps(3)} />*/}
            {/*<Tab label="Reason History" {...a11yProps(4)} />*/}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <OrderInformation refundId={id} cookies={cookies} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <RefundInformation warrantyId={id} cookies={cookies} />
        </TabPanel>

        {/*<TabPanel value={value} index={2}>*/}
        {/*  <MerchantInformation warrantyId={id} cookies={cookies} />*/}
        {/*</TabPanel>*/}

        {/*<TabPanel index={3} value={value}>*/}
        {/*  <StatusHistory warrantyId={id} cookies={cookies} />*/}
        {/*</TabPanel>*/}

        {/*<TabPanel index={4} value={value}>*/}
        {/*  <ReasonHistory warrantyId={id} cookies={cookies} />*/}
        {/*</TabPanel>*/}
      </div>
    </div>
  );
};

export default Id;

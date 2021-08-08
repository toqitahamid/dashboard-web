import nookies from 'nookies';
import { firebaseAdmin } from '../../../firebaseAdmin';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TableCell,
  Tabs,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import NavBar from '../../components/NavBar';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const drawerWidth = 240;
// @ts-ignore
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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

const WarrantyID = () => {
  const router = useRouter();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
        <Link color="inherit" href="/warranty">
          Warranty
        </Link>
        <Typography color="textPrimary">Warranty ID</Typography>
      </Breadcrumbs>
    );
  };

  return (
    <div className={classes.root}>
      <NavBar selectedListItem={3} token={token} />

      <div className={classes.content}>
        <div className={classes.breadcrumb}>
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
            <Tab label="Warranty" {...a11yProps(1)} />
            <Tab label="Merchant" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                // className={classes.title}
                variant="h6"
                color="textSecondary"
                gutterBottom
              >
                Order Information
              </Typography>
              <Divider />
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        RMA ID
                      </TableCell>
                      <TableCell component="th" scope="row">
                        RMA-511
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        RMA Create Date
                      </TableCell>
                      <TableCell component="th" scope="row">
                        July 10, 2021
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Order ID
                      </TableCell>
                      <TableCell component="th" scope="row">
                        303030
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Product Name
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Anker Motion Q Wireless Speaker
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        SKU
                      </TableCell>
                      <TableCell component="th" scope="row">
                        PNGN-1212
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer Name
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Amit Iqbal
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                // className={classes.title}
                variant="h6"
                color="textSecondary"
                gutterBottom
              >
                Warranty Information
              </Typography>
              <Divider />
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Warranty Reason
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Power button not working
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Warranty Type
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Servicing Request (Within Warranty Period)
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Status
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            <MenuItem value={0}>New Request</MenuItem>
                            <MenuItem value={1}>
                              Pickup Request from Pathao
                            </MenuItem>
                            <MenuItem value={2}>Recieved from Pathao</MenuItem>
                            <MenuItem value={3}>In-house Checking</MenuItem>
                            <MenuItem value={4}>
                              Product Sent to Merchant
                            </MenuItem>
                            <MenuItem value={5}>
                              New Unit Recieved from Merchant
                            </MenuItem>
                            <MenuItem value={6}>
                              Old Unit Recieved from Merchant
                            </MenuItem>
                            <MenuItem value={7}>
                              New Unit Sent to Customer
                            </MenuItem>
                            <MenuItem value={8}>
                              Old Unit Sent to Customer
                            </MenuItem>
                            <MenuItem value={8}> Refund Requested</MenuItem>
                            <MenuItem value={9}> Recieved from scs</MenuItem>
                            <MenuItem value={10}> Refunded</MenuItem>
                            <MenuItem value={11}>
                              Customer has sent the product but not arrived till
                              now
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Product Recieved Date
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          {/*<Grid container justifyContent="space-around">*/}
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                          {/*</Grid>*/}
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid
                container
                direction="row-reverse"
                className={classes.saveButton}
              >
                <Grid item>
                  <Button color="primary" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                // className={classes.title}
                variant="h6"
                color="textSecondary"
                gutterBottom
              >
                Merchant Information
              </Typography>
              <Divider />
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Merchant
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            <MenuItem value={0}>Mpow</MenuItem>
                            <MenuItem value={1}>Star Tech</MenuItem>
                            <MenuItem value={2}>Style Merchandise</MenuItem>
                            <MenuItem value={3}>Raiyan</MenuItem>
                            <MenuItem value={4}>Open Source</MenuItem>
                            <MenuItem value={5}>Newaz</MenuItem>
                            <MenuItem value={6}>Mollah Telecom</MenuItem>
                            <MenuItem value={7}>Mohaz Telecom</MenuItem>
                            <MenuItem value={8}>Shamim</MenuItem>
                            <MenuItem value={8}> Ashraf International</MenuItem>
                            <MenuItem value={9}> Anker</MenuItem>
                            <MenuItem value={10}> Motion View</MenuItem>
                            <MenuItem value={11}>BM</MenuItem>
                            <MenuItem value={11}>Studio Mason</MenuItem>
                            <MenuItem value={11}>mShop</MenuItem>
                            <MenuItem value={11}>Lite Electronics</MenuItem>
                            <MenuItem value={11}>MH Telecom</MenuItem>
                            <MenuItem value={11}>AIIM Global</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Sent to Merchant
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            <MenuItem value={0}>Yes</MenuItem>
                            <MenuItem value={1}>No</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date sent to Merchant
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          {/*<Grid container justifyContent="space-around">*/}
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                          {/*</Grid>*/}
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date Recieved from Merchant
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          {/*<Grid container justifyContent="space-around">*/}
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                          {/*</Grid>*/}
                        </MuiPickersUtilsProvider>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Feedback from Merchant
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            <MenuItem value={0}>New Product Issued</MenuItem>
                            <MenuItem value={1}>Fixed the product</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid
                container
                direction="row-reverse"
                className={classes.saveButton}
              >
                <Grid item>
                  <Button color="primary" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
    </div>
  );
};

export default WarrantyID;

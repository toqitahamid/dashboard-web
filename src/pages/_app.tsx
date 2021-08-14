import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { AuthProvider } from '../../auth';
import { Box } from '@material-ui/core';
import Copyright from '../components/navigation/footer/copyright';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: drawerWidth,
    },
  },
}));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  // const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Penguin Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <AuthProvider>
          {/*<NavBar/>*/}
          {/*<main className={classes.content}>*/}
          {/*<div className={classes.toolbar} />*/}
          <Component {...pageProps} />
          <Box mt={200}>
            <Copyright />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

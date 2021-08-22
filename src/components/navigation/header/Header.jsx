import { AppBar, Button, Grid, IconButton } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { firebaseClient } from '../../../../firebaseClient';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../../../auth';
// import logo from './image/logo.png';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% -${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flex: 1,
    // paddingLeft: drawerWidth,
    paddingLeft: theme.spacing(10),
  },
  logo: {
    maxWidth: 40,
    marginRight: '10px',
  },
}));

const Header = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const user = useAuth();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/*<img src="/public/logo.png" alt="penguin" />*/}
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography className={classes.title} variant="h6" noWrap>
                Penguin
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row-reverse"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              {user ? (
                <Link href={'/dashboard'} passHref>
                  <Button
                    color="inherit"
                    onClick={async () => {
                      await firebaseClient.auth().signOut();
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              ) : (
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

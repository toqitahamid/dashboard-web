import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Link from 'next/link';
import { Home, Inbox } from '@material-ui/icons';
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const DrawerItems = ({ selectedListItem }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href={'/dashboard'} passHref>
          <ListItem button key="Home" selected={selectedListItem === 0}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link href={'/products'} passHref>
          <ListItem button key="Products" selected={selectedListItem === 1}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>

        <ListItem button key="Orders" selected={selectedListItem === 2}>
          <ListItemIcon>
            <ViewQuiltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <Link href={'/warranty'} passHref>
          <ListItem button key="Warranty" selected={selectedListItem === 3}>
            <ListItemIcon>
              <ViewQuiltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Warranty" />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        <ListItem button key="Users" selected={selectedListItem === 4}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem button key="Merchants" selected={selectedListItem === 5}>
          <ListItemIcon>
            <ViewQuiltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Merchants" />
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerItems;

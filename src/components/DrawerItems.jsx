import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Link from 'next/link';
import {
  AccessTime,
  ExpandLess,
  ExpandMore,
  Home,
  Inbox,
  ListAlt,
  MergeType,
  StarBorder,
} from '@material-ui/icons';
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: 32,
  },
}));

const DrawerItems = ({ selectedListItem, token }) => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href={'/dashboard'} passHref>
          <ListItem dense button key="Home" selected={selectedListItem === 0}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        {token.admin ? (
          <Link href={'/products'} passHref>
            <ListItem
              dense
              button
              key="Products"
              selected={selectedListItem === 1}
            >
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
        ) : null}

        {token.admin ? (
          <Link href={'/order'} passHref>
            <ListItem
              dense
              button
              key="Orders"
              selected={selectedListItem === 2}
            >
              <ListItemIcon>
                <ViewQuiltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>
        ) : null}

        <ListItem dense button onClick={handleClick} key="Warranty">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Warranty" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Link href={'/warranty/new-warranty'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 3}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="New Warranty" />
            </ListItem>
          </Link>

          <Link href={'/warranty/warranty-list'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 4}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Warranty List" />
            </ListItem>
          </Link>

          <Link href={'/warranty/status'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 5}
            >
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText primary="Status" />
            </ListItem>
          </Link>

          <Link href={'/warranty/warranty-type'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 6}
            >
              <ListItemIcon>
                <MergeType />
              </ListItemIcon>
              <ListItemText primary="Warranty Type" />
            </ListItem>
          </Link>

          <Link href={'/warranty/merchant'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 7}
            >
              <ListItemIcon>
                <ViewQuiltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Merchant" />
            </ListItem>
          </Link>
        </Collapse>

        {/*<Link href={'/warranty'} passHref>*/}
        {/*  <ListItem button key="Warranty">*/}
        {/*    <ListItemIcon>*/}
        {/*      <ViewQuiltRoundedIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Warranty" />*/}
        {/*  </ListItem>*/}
        {/*</Link>*/}

        <Link href={'/refund'} passHref>
          <ListItem dense button key="Refund" selected={selectedListItem === 8}>
            <ListItemIcon>
              <ViewQuiltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Refund" />
          </ListItem>
        </Link>
      </List>

      <Divider />

      {token.admin ? (
        <List>
          <ListItem dense button key="Users" selected={selectedListItem === 9}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>

          {/*<ListItem button key="Merchants" selected={selectedListItem === 9}>*/}
          {/*  <ListItemIcon>*/}
          {/*    <ViewQuiltRoundedIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Merchants" />*/}
          {/*</ListItem>*/}
        </List>
      ) : null}
    </div>
  );
};

export default DrawerItems;

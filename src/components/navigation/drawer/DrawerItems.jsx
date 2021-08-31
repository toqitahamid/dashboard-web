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
  AcUnit,
  AttachMoney,
  ExpandLess,
  ExpandMore,
  Home,
  Inbox,
  ListAlt,
  MergeType,
  Replay,
  Restore,
  StarBorder,
} from '@material-ui/icons';
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import React, { useState } from 'react';
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
  // console.log(token);

  const [openWarranty, setOpenWarranty] = React.useState(true);
  const [openRefund, setOpenRefund] = React.useState(true);
  const [openInventory, setOpenInventory] = useState(true);
  const [openUser, setOpenUser] = useState(true);

  const handleClickInventory = () => {
    setOpenInventory(!openInventory);
  };

  const handleClickWarranty = () => {
    setOpenWarranty(!openWarranty);
  };

  const handleClickRefund = () => {
    setOpenRefund(!openRefund);
  };

  const handleClickUser = () => {
    setOpenUser(!openUser);
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

        <ListItem dense button onClick={handleClickInventory} key="Inventory">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {token.admin ? (
          <Collapse in={openInventory} timeout="auto" unmountOnExit>
            <Link href={'/inventory/stock-in'} passHref>
              <ListItem
                dense
                button
                className={classes.nested}
                selected={selectedListItem === 3}
              >
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Stock In" />
              </ListItem>
            </Link>
          </Collapse>
        ) : null}

        <ListItem dense button onClick={handleClickWarranty} key="Warranty">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Warranty" />
          {openWarranty ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openWarranty} timeout="auto" unmountOnExit>
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

          {token.storeSupport != true ? (
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
          ) : null}

          {token.storeSupport != true ? (
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
          ) : null}

          {token.storeSupport != true ? (
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
          ) : null}
        </Collapse>

        <ListItem dense button onClick={handleClickRefund} key="Refund">
          <ListItemIcon>
            <Replay />
          </ListItemIcon>
          <ListItemText primary="Refund" />
          {openRefund ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openRefund} timeout="auto" unmountOnExit>
          <Link href={'/refund/new-refund'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 8}
            >
              <ListItemIcon>
                <Restore />
              </ListItemIcon>
              <ListItemText primary="New Refund" />
            </ListItem>
          </Link>

          <Link href={'/refund/refund-list'} passHref>
            <ListItem
              dense
              button
              className={classes.nested}
              selected={selectedListItem === 9}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Refund List" />
            </ListItem>
          </Link>

          {token.storeSupport != true ? (
            <Link href={'/refund/refund-status'} passHref>
              <ListItem
                dense
                button
                className={classes.nested}
                selected={selectedListItem === 10}
              >
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText primary="Refund Status" />
              </ListItem>
            </Link>
          ) : null}

          {token.storeSupport != true ? (
            <Link href={'/refund/payment-gateway'} passHref>
              <ListItem
                dense
                button
                className={classes.nested}
                selected={selectedListItem === 11}
              >
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Payment Gateway" />
              </ListItem>
            </Link>
          ) : null}

          {token.storeSupport != true ? (
            <Link href={'/refund/refund-type'} passHref>
              <ListItem
                dense
                button
                className={classes.nested}
                selected={selectedListItem === 12}
              >
                <ListItemIcon>
                  <AcUnit />
                </ListItemIcon>
                <ListItemText primary="Refund Type" />
              </ListItem>
            </Link>
          ) : null}
        </Collapse>
      </List>

      <Divider />

      {token.admin ? (
        <List>
          <ListItem dense button onClick={handleClickUser} key="Refund">
            <ListItemIcon>
              <Replay />
            </ListItemIcon>
            <ListItemText primary="User" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUser} timeout="auto" unmountOnExit>
            <Link href={'/user/manage-user'} passHref>
              <ListItem
                dense
                button
                className={classes.nested}
                selected={selectedListItem === 14}
              >
                <ListItemIcon>
                  <Restore />
                </ListItemIcon>
                <ListItemText primary="Manage User" />
              </ListItem>
            </Link>
          </Collapse>
        </List>
      ) : null}
    </div>
  );
};

export default DrawerItems;

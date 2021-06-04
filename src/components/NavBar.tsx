import React, {useState} from "react";
import {
    AppBar,
    Button, Divider,
    Drawer, Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {Inbox} from "@material-ui/icons";
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import {makeStyles, useTheme} from "@material-ui/styles";
import Link from 'next/link'
import { useAuth } from '../../auth';
import { firebaseClient } from '../../firebaseClient';
import { router } from 'next/client';
import products from '../pages/products';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% -${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flex: 1,
        paddingLeft: drawerWidth,
    }
}));

function NavBar(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const user = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const drawer = () => {
        return(
            <div>
                <div className={classes.toolbar}/>
                <Divider />
                <List>
                    <Link href={"products"}>
                        <ListItem button key="Products">
                            <ListItemIcon>
                                <Inbox/>
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </Link>


                    <ListItem button key="Orders">
                        <ListItemIcon>
                            <ViewQuiltRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Users">
                        <ListItemIcon>
                            <Inbox/>
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>

                    <ListItem button key="Merchants">
                        <ListItemIcon>
                            <ViewQuiltRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Merchants" />
                    </ListItem>
                </List>
            </div>

        );
    }

    const container = window != undefined ? () => window().document.body : undefined;





    return(
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Penguin
                    </Typography>

                    {user ?
                      <Link href={"/"}>
                          <Button color="inherit" onClick={async () => {
                              await firebaseClient
                                .auth()
                                .signOut();
                          }
                          }>Logout</Button>
                      </Link>
                         :
                      <Link href="login">
                          <Button color="inherit">Login</Button>
                      </Link>
                    }



                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer()}
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer classes={{paper: classes.drawerPaper,}} variant='permanent' open>
                        {drawer()}
                    </Drawer>
                </Hidden>

            </nav>

        </div>
    )

}


export default NavBar;

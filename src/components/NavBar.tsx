import React, {useState} from "react";
import {
    AppBar,
    Button, CssBaseline, Divider,
    Drawer, Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    PropTypes
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {Inbox} from "@material-ui/icons";
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import {d} from "@firebase/firestore/dist/node-cjs/packages/firestore/dist/node-esm2017/database-ee8aa46d";
import {use} from "ast-types";
import {makeStyles, useTheme} from "@material-ui/styles";
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
        flexGrow: 1,
    },
}));

function NavBar(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const drawer = () => {
        return(
            <div>
                {/*<div className={classes.toolbar}/>*/}
                <Divider />
                <List>
                    <ListItem button key="Orders">
                        <ListItemIcon>
                            <Inbox/>
                            <ListItemText primary="Orders" />
                        </ListItemIcon>
                    </ListItem>

                    <ListItem button key="Orders">
                        <ListItemIcon>
                            <ViewQuiltRoundedIcon/>
                            <ListItemText primary="Orders" />
                        </ListItemIcon>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Orders">
                        <ListItemIcon>
                            <Inbox/>
                            <ListItemText primary="Orders" />

                        </ListItemIcon>
                    </ListItem>

                    <ListItem button key="Orders">
                        <ListItemIcon>
                            <ViewQuiltRoundedIcon/>
                            <ListItemText primary="Orders" />
                        </ListItemIcon>
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
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Penguin
                    </Typography>
                    <Button color="inherit">Login</Button>
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

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </main>
        </div>
    )

}


export default NavBar;

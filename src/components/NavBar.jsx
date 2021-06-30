import React, {useState} from "react";
import { Drawer, Hidden} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Header from './Header';
import DrawerItems from './DrawerItems';

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
    drawerPaper: {
        width: drawerWidth,
    },

}));

function NavBar({selectedListItem }) {
    // const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    // const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <div className={classes.root}>
            <Header handleDrawerToggle={handleDrawerToggle}/>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        // container={container}
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
                        {/*{drawer()}*/}
                        <DrawerItems selectedListItem={selectedListItem}/>
                    </Drawer>
                </Hidden>

                <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{paper: classes.drawerPaper,}}
                      variant='permanent'
                      open>
                        {/*{drawer()}*/}
                        <DrawerItems selectedListItem={selectedListItem}/>
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )

}


export default NavBar;

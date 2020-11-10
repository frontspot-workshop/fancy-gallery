import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import CakeIcon from '@material-ui/icons/Cake';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import AppleIcon from '@material-ui/icons/Apple';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link } from '@reach/router';

const menuItems = [
    { label: 'Cats', query: 'Cats', icon: <PetsIcon /> },
    { label: 'Cake', query: 'Cake', icon: <CakeIcon /> },
    { label: 'Tea', query: 'Tea', icon: <EmojiFoodBeverageIcon /> },
    { label: 'Apple', query: 'Apple', icon: <AppleIcon /> },
]

export const SIDEBAR_WIDTH = '200px';

const useStyles = makeStyles((theme) => ({
    sidebarOpen: {
        width: SIDEBAR_WIDTH,
        transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen })
    },
    sidebarClose: {
        width: theme.spacing(7) + 1,
        overflow: 'hidden',
        transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen })
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    }
}));

const Sidebar = ({ open, handleSidebarClose }: { open: boolean, handleSidebarClose: () => void }) => {
    const classes = useStyles();
    const drawerClass = open ? classes.sidebarOpen : classes.sidebarClose;
    return (
        <Drawer variant="permanent" className={drawerClass} classes={{ paper: drawerClass }}>
            <div className={classes.toolbar}>
                <IconButton onClick={handleSidebarClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems.map(item => (
                    <Link to={`gallery/${item.query}`} key={item.label} className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;
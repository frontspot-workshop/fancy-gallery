import React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router';
import { SIDEBAR_WIDTH } from './Sidebar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
    },
    appBarShift: {
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        marginLeft: SIDEBAR_WIDTH,
        transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    menuIcon: {
        color: 'white',
    },
    link: {
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none'
    }
}));

const Header = ({ open, handleSidebarOpen }: { open: boolean, handleSidebarOpen: () => void }) => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={open ? classes.appBarShift : classes.appBar} >
            <Toolbar>
                <IconButton edge="start" className={classes.menuIcon} onClick={handleSidebarOpen} style={{ display: open ? 'none' : 'flex' }}>
                    <MenuIcon />
                </IconButton>
                <Link to="/" className={classes.link}>
                    <PhotoCameraIcon className={classes.icon} />
                    <Typography variant="h6">Fancy Gallery</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
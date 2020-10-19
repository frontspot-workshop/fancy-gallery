import React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MenuIcon from '@material-ui/icons/Menu';
import { SIDEBAR_WIDTH } from './Sidebar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        marginLeft: SIDEBAR_WIDTH,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    menuIcon: {
        color: 'white',
    },
}));

const Header = ({ open, handleSidebarOpen }: { open: boolean, handleSidebarOpen: () => void }) => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={open ? classes.appBarShift : classes.appBar} >
            <Toolbar>
                <IconButton edge="start" className={classes.menuIcon} onClick={handleSidebarOpen} style={{ display: open ? 'none' : 'flex' }}>
                    <MenuIcon />
                </IconButton>
                <PhotoCameraIcon className={classes.icon} />
                <Typography variant="h6">Fancy Gallery</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
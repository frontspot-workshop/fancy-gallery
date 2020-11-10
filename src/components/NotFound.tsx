import React from 'react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link, RouteComponentProps } from '@reach/router';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    }
}))
const NotFound = (props: RouteComponentProps) => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h4">Page not found</Typography>
            <IconButton color="secondary" component={Link} to="/">
                <HomeIcon fontSize="large" />
            </IconButton>
        </div>
    )
}

export default NotFound;
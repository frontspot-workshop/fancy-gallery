import { Dialog, makeStyles } from '@material-ui/core';
import React from 'react';
import { Image } from '../service/types';
import FancySlider from './FancySlider';

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'rgba(0, 0, 0, 0.7)',
    },
    paper: {
        background: 'none',
        boxShadow: 'none',
        overflowY: 'unset',
    },
    paperWidthSm: {
        maxWidth: '700px',
    }
}));

const Slider = ({ open, handleClose, images, initialIndex }: { open: boolean, handleClose: () => void, images: Image[], initialIndex: number }) => {
    const classes = useStyles();

    const onClose = () =>{
        handleClose();
    }

    return (
        <Dialog open={open} onClose={()=>onClose()} classes={{ root: classes.root, paper: classes.paper, paperWidthSm: classes.paperWidthSm }}>
            <FancySlider images={images} initialIndex={initialIndex}/>
        </Dialog>
    )
}

export default Slider;
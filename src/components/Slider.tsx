import { Dialog, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Image } from '../service/types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        width: '700px',
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: 400,
        })
    },
    image: {
        width: '100%'
    },
    description: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    likes: {
        display: 'flex'
    },
    label: {
        color: 'white'
    },
    icon: {
        color: 'white',
        marginRight: theme.spacing(0.5),
    },
    button: {
        color: 'white',
        cursor: 'pointer',
        margin: theme.spacing(1),
        padding: theme.spacing(0.5),
    },
    root: {
        background: 'rgba(0, 0, 0, 0.7)',
    },
    paper: {
        background: 'none',
        boxShadow: 'none',
    },
    paperWidthSm: {
        maxWidth: '700px',
    }
}));

const Slider = ({ open, handleClose, images, initialIndex }: { open: boolean, handleClose: () => void, images: Image[], initialIndex: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const classes = useStyles();
    useEffect(() => setCurrentIndex(initialIndex), [initialIndex]);

    const image = images[currentIndex];

    const goToPreviousSlide = () => {
        const index = currentIndex === 0 ? 0 : currentIndex - 1;
        changeSlide(index);
    }

    const gotToNextSlide = () => {
        const index = currentIndex < images.length ? currentIndex + 1 : images.length;
        changeSlide(index);
    }

    const changeSlide = (newIndex: number) => {
        setIsLoaded(false);
        setTimeout(() => setCurrentIndex(newIndex), 400);
    }

    const onClose = () =>{
        setIsLoaded(false);
        handleClose();
    }
    const isPreviousDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === images.length - 1;

    return (
        <Dialog open={open} onClose={()=>onClose()} classes={{ root: classes.root, paper: classes.paper, paperWidthSm: classes.paperWidthSm }}>
            <div className={classes.wrapper}>
                <IconButton onClick={goToPreviousSlide} disabled={isPreviousDisabled} className={classes.button}>
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <div className={classes.content} style={{ opacity: isLoaded ? 1 : 0 }}>
                    <img onLoad={() => setIsLoaded(true)} className={classes.image} src={image.urls.regular} alt={image.alt_description} />
                    <div className={classes.description}>
                        <div className={classes.likes}>
                            <FavoriteBorderIcon className={classes.icon} />
                            <Typography className={classes.label}>{image.likes}</Typography>
                        </div>
                        <Typography className={classes.label}>{currentIndex + 1} of {images.length}</Typography>
                    </div>
                </div>
                <IconButton onClick={gotToNextSlide} disabled={isNextDisabled} className={classes.button}>
                    <ChevronRightIcon fontSize="large" />
                </IconButton>
            </div>
        </Dialog>
    )

}

export default Slider;
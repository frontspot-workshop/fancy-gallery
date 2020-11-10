import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useLazyLoading } from '../service/hooks';
import { Image } from '../service/types';

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    regular: {
        transition: theme.transitions.create('opacity', { easing: theme.transitions.easing.sharp, duration: 400 })

    },
    thumb: {
        filter: 'blur(20px)',
        transform: 'scale(1.1)',
        transition: theme.transitions.create('visibility', { easing: theme.transitions.easing.sharp, duration: 400 })
    },
    imageTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: theme.spacing(1, 1, 0, 0),
        color: theme.palette.secondary.dark,
    },
    likes: {
        zIndex: 1,
    },
    icon: {
        zIndex: 1,
        marginRight: theme.spacing(0.5),
    }
}))

const ImageContainer = ({ image }: { image: Image }) => {
    const { urls, alt_description, height, width, likes } = image;
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const target = useRef<any>();
    const classes = useStyles();

    const ratio = height / width * 100;

    const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(target.current);
        }
    };

    useLazyLoading({ target, onIntersection });

    return (
        <div
            ref={target}
            className={classes.imageContainer}
            style={{ paddingBottom: `${ratio}%` }}
        >
            {isVisible && (
                <>
                    <img className={clsx(classes.image, classes.thumb)} src={urls.thumb} alt={alt_description} style={{ visibility: isLoaded ? 'hidden' : 'visible' }} />
                    <img onLoad={() => setIsLoaded(true)} className={clsx(classes.image, classes.regular)} src={urls.regular} alt={alt_description} style={{ opacity: isLoaded ? 1 : 0 }} />
                    <div className={classes.imageTitle}>
                        <FavoriteBorderIcon className={classes.icon}/>
                        <Typography className={classes.likes}>{likes}</Typography>
                    </div>
                </>
            )}
        </div>
    );

}

export default ImageContainer;
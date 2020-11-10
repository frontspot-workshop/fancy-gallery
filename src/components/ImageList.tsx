import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageContainer from './ImageContainer';
import { Image } from '../service/types';

const useStyles = makeStyles(()=>({
    imageGrid:{
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
    },
    imageItem: {
        '&:nth-child(5n)':{
            gridColumnEnd: 'span 2'
        }
    }

}));
const ImageList = ({ images }: { images: Image[] }) => {
    const classes = useStyles();
    return (
        <div className={classes.imageGrid}>
            {images.map((image, index) => {
                return (
                    <div
                        className={classes.imageItem}
                        key={`${image.id}-${index}`}
                    >
                        <ImageContainer image={image} /> 
                    </div>
                );
            })}
        </div>
    )
}

export default ImageList;
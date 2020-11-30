import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ImageContainer from './ImageContainer';
import { Image } from '../service/types';
import Slider from './Slider';

const useStyles = makeStyles(() => ({
    imageGrid: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
    },
    imageItem: {
        '&:nth-child(5n)': {
            gridColumnEnd: 'span 2'
        }
    }

}));

const ImageList = ({ images }: { images: Image[] }) => {
    const [open, setOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const handleOpen = (index:number) => {
        setOpen(true);
        setImageIndex(index);
    }

    const handleCLose = () => {
        setOpen(false);
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.imageGrid}>
                {images.map((image, index) => {
                    return (
                        <div
                            className={classes.imageItem}
                            key={`${image.id}-${index}`}
                        >
                            <ImageContainer image={image} handleOpen={()=>handleOpen(index)}/>
                        </div>
                    );
                })}
            </div>
            <Slider open={open} handleClose={handleCLose} images={images} initialIndex={imageIndex}/>
        </>
    )
}

export default ImageList;
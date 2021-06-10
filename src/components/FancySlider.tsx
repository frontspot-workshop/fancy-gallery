import React, { useEffect, useRef } from 'react';
import { Image } from '../service/types';

const FancySlider = ({ images, initialIndex }: { images: Image[], initialIndex: number }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        (elementRef.current as any)!.images = images;
        (elementRef.current as any)!.initialIndex = initialIndex;
    }, [images, initialIndex])

    return <fancy-slider ref={elementRef}></fancy-slider>
}

export default FancySlider;
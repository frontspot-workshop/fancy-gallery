import React from 'react';
import { Image } from '../service/types';

const ImageList = ({ images }: { images: Image[] }) => {
    return (
        <div className="image-grid">
            {images.map((image, index) => {
                const { id, webformatURL, tags } = image;
                return (
                    <div
                        className="image-item"
                        key={`${id}-${index}`}
                        style={{ backgroundColor: "grey" }}
                    >
                        <img src={webformatURL} alt={tags} />
                    </div>
                );
            })}
        </div>
    )
}

export default ImageList;
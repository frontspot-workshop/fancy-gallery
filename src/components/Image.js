import React from "react";

function Image({ image }) {
  const { color, urls, alt_description } = image;

  return (
    <div className="image-item" style={{ backgroundColor: color }}>
      <img src={urls.small} alt={alt_description} />
    </div>
  );
}

Image.Memorizied = React.memo(Image);
export default Image;

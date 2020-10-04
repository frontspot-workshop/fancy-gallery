import React from "react";

function Image({ image }) {
  const { color, urls, alt_description } = image;

  console.log("Render image component");
  return (
    <div className="image-item" style={{ backgroundColor: color }}>
      <img src={urls.small} alt={alt_description} />
    </div>
  );
}

const MemoriziedImage = React.memo(Image);

export { MemoriziedImage };
export default Image;

import React, { useState } from "react";

import { MemoriziedImage, Pagination } from "./components";
import { useImages } from "./hooks";

function Main() {
  const { images = [], setPage, setQuery, page } = useImages();
  const [searchValue, setSearchValue] = useState("");
  const imagesIsArray = Array.isArray(images);
  const data = imagesIsArray ? images : images.results;
  const pagination = imagesIsArray
    ? {}
    : { resultSize: images.total, totalPages: images.total_pages };

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchClick() {
    setPage(1);
    setQuery(searchValue);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>
      <div>
        <input type="text" value={searchValue} onChange={handleInputChange} />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <Pagination onPaginationClick={setPage} page={page} {...pagination} />
      {!imagesIsArray && (
        <div>
          <h2>
            <span>Total: {images.total} </span>---
            <span>Total pages: {images.total_pages} </span>
          </h2>
        </div>
      )}

      <div className="image-grid">
        {data.map((image) => (
          <MemoriziedImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Main;

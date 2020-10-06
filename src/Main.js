import React, { useState } from "react";

import { Image, Pagination, Spinner } from "./components";
import { useImages } from "./hooks";

function Main() {
  const {
    images = [],
    setPage,
    setQuery,
    page,
    isLoading,
    triggerLoad,
  } = useImages();
  const [searchValue, setSearchValue] = useState("");
  const imagesIsArray = Array.isArray(images);
  const data = imagesIsArray ? images : images.results;
  const pagination = imagesIsArray
    ? {}
    : { resultSize: images.total, totalPages: images.total_pages };

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setPage(1);
    setQuery(searchValue);
    triggerLoad();
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>
      <div className="controls">
        <form className="search" onSubmit={handleSubmitForm}>
          <input
            className="search__input"
            type="text"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn search__button">
            Search
          </button>
        </form>

        <Pagination
          onPaginationClick={(page) => {
            triggerLoad();
            setPage(page);
          }}
          page={page}
          {...pagination}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="image-grid">
          {data.map((image) => (
            <Image.Memorizied key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;

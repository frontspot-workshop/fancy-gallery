import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL } from "./credentials";
import "./App.css";
import "fontsource-roboto";
import Button from "@material-ui/core/Button";
import { Pagination, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Box } from "@material-ui/core";



function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imagesPerPage] = useState(20);
  const [query, setQuery] = useState("");

  const searchImages = () => {
    axios
      .get(
        `${API_URL}?key=${ACCESS_KEY}&q=${query}&page=${page}&per_page=${imagesPerPage}&image_type=photo`
      )
      .then((response) => {
        setImages(response.data.hits);
        setTotalPages(Math.ceil(response.data.totalHits / imagesPerPage));
      });
  };

  const handleTagClick = (event, newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPage(1);
    }
    setQuery(newQuery);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };


  useEffect(() => {
    searchImages();
  }, [page, query]);

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>

      <div className="tags">
        <ToggleButtonGroup
          value={query}
          exclusive
          onChange={handleTagClick}
          aria-label="Image tags"
        >
          <ToggleButton value="Cats" aria-label="Cats images">
            Cats
          </ToggleButton>
          <ToggleButton value="Dogs" aria-label="Dogs images">
            Dogs
          </ToggleButton>
          <ToggleButton value="Coffee" aria-label="Coffee images">
            Coffee
          </ToggleButton>
          <ToggleButton value="React" aria-label="React">
            React
          </ToggleButton>
          <ToggleButton value="" aria-label="Random">
            Random
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Pagination
          className="pages"
          count={totalPages}
          showFirstButton
          showLastButton
          page={page}
          variant="outlined"
          onChange={handleChangePage}
        />
      </Box>
      <div className="image-grid">
        {images.map((image) => {
          const { id, webformatURL, tags } = image;
          return (
            <div
              className="image-item"
              key={id}
              style={{ backgroundColor: "grey" }}
            >
              <img src={webformatURL} alt={tags} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

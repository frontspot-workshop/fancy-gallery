import React, { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL } from "./credentials";
import { Pagination, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { AppBar, Badge, Grid, makeStyles, Paper, Toolbar, Typography } from "@material-ui/core";
import "./App.css";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  offset: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  tags: {
    background:"white"
  }
}));

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [imagesPerPage] = useState(20);
  const [query, setQuery] = useState("");
  const [tags] = useState(["Cats", "Dogs", "Coffee", "React", ""]);
  const classes = useStyles();

  useEffect(() => {
    searchImages();
  }, [page, query, imagesPerPage, totalImages]);

  const searchImages = () => {
    axios
      .get(
        `${API_URL}?key=${ACCESS_KEY}&q=${query}&page=${page}&per_page=${imagesPerPage}&image_type=photo`
      )
      .then((response) => {
        setImages(response.data.hits);
        setTotalImages(response.data.totalHits);
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fancy Gallery
          </Typography>
          <ToggleButtonGroup
            className={classes.tags}
            value={query}
            exclusive
            onChange={handleTagClick}
            aria-label="Image tags"
          >
            {tags.map((tag) => {
              return (
                <ToggleButton value={tag} aria-label={{ tag } + " images"}>
                  {tag === "" ? "Random" : tag}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />

      <Grid container>
        <Grid item xs={12}>
          <Paper className="image-grid">
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
          </Paper>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Paper className={classes.paper} elevation={0}>
            <Badge color="secondary" badgeContent={totalImages} max={999}>
              {query === "" && (
                <Pagination
                  className="pages"
                  count={totalPages}
                  showFirstButton
                  showLastButton
                  page={page}
                  variant="outlined"
                  onChange={handleChangePage}
                />
              )}
              {query !== "" && (
                <Pagination
                  className="pages"
                  count={totalPages}
                  showFirstButton
                  page={page}
                  variant="outlined"
                  onChange={handleChangePage}
                />
              )}
            </Badge>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

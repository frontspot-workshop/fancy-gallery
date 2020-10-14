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
    "& img":{
      display: "flex",
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
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
  },
  imageGrid:{
    display: "grid",
    margin: "10px",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
  },
  imageItem:{
    "&:nth-child(5n)": {
      gridColumnEnd: "span 2"    
    }
  }
}));

function App() {

  const TAGS = ["Cats", "Dogs", "Coffee", "React", ""];
  const IMAGES_PER_PAGE = 20;

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [query, setQuery] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const searchImages = () => {
      axios
        .get(
          `${API_URL}?key=${ACCESS_KEY}&q=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&image_type=photo`
        )
        .then((response) => {
          setImages(response.data.hits);
          setTotalImages(response.data.totalHits);
          setTotalPages(Math.ceil(response.data.totalHits / IMAGES_PER_PAGE));
        });
    }
    searchImages();
  }, [page, query]);

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
            {TAGS.map((tag) => {
              return (
                <ToggleButton key={tag} value={tag} aria-label={{ tag } + " images"}>
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
          <Paper className={classes.imageGrid}>
            {images.map((image) => {
              const { id, webformatURL, tags } = image;
              return (
                <div
                  className={classes.imageItem}
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
              <Pagination
                count={totalPages}
                showFirstButton
                showLastButton = {!!query}
                page={page}
                variant="outlined"
                onChange={handleChangePage}
              />  
            </Badge>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

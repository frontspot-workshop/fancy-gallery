import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ImageList from './components/ImageList';
import { useFetchData, useIntersectionObserver } from './service/hooks';
import { Image } from './service/types';
import { ACCESS_KEY, API_URL } from "./credentials";
import "./App.css";
import ScrollTop from "./components/ScrollTop";

const INITIAL_PAGE = 1;
const IMAGES_PER_PAGE = 20;

const useStyles = makeStyles((theme) => ({
  loading: {
    padding: theme.spacing(1),
    alignSelf: 'center',
  },
  title: {
    padding: theme.spacing(2, 0),
  }
}));

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [path, setPath] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>();
  const { data, loading, hasError } = useFetchData(path);
  const { loader, hasIntersection } = useIntersectionObserver();

  const classes = useStyles();

  const params = `?key=${ACCESS_KEY}&q=${query ? query : ""}&page=${page}&per_page=${IMAGES_PER_PAGE}&image_type=photo`;

  const handleClick = (newQuery?: string) => {
    if (newQuery !== query) {
      setImages([]);
      setPage(INITIAL_PAGE);
    }
    setQuery(newQuery);
  };

  const handleSidebarOpen = () => {
    setOpen(true);
  }

  const handleSidebarClose = () => {
    setOpen(false);
  }

  useEffect(() => setImages(images => [...images, ...data]), [data]);

  useEffect(() => { if (hasIntersection) { setPage(page => page + 1) } }, [hasIntersection])

  useEffect(() => {
      setPath(`${API_URL}${params}`);
  }, [params]);

  return (
    <Grid container direction="column" justify="center">
      <Header open={open} handleSidebarOpen={handleSidebarOpen} />
      <Sidebar handleClick={handleClick} open={open} handleSidebarClose={handleSidebarClose} />
      <Typography variant="h2" align="center" color="primary" className={classes.title}>{query || 'Random'}</Typography>
      {images.length > 0 && <ImageList images={images} />}
      {hasError && <Typography variant="h4" color="secondary" align="center">Something goes wrong...</Typography>}
      <ScrollTop/>
      <div ref={loader} className={classes.loading}>{loading && <CircularProgress />}</div>
    </Grid>
  );
}

export default App;

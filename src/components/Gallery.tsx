import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from '@reach/router';
import { CircularProgress, Container, Fab, makeStyles, Typography, useScrollTrigger, Zoom } from "@material-ui/core";
import ImageList from './ImageList';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useFetchData, useIntersectionObserver } from '../service/hooks';
import { Image } from '../service/types';
import { ACCESS_KEY, API_URL } from "../credentials";

const INITIAL_PAGE = 1;

interface GalleryProps extends RouteComponentProps {
  query?: string
};

const useStyles = makeStyles((theme) => ({
  loading: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    padding: theme.spacing(2, 0),
  },
  content: {
    paddingLeft: theme.spacing(8) + 1,
    paddingRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  }
}));

const Gallery = ({ query }: GalleryProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [path, setPath] = useState<string>('');
  const { data, loading, hasError } = useFetchData(path);
  const { loader, hasIntersection } = useIntersectionObserver();
  const prevQuery = useRef<string>();
  const classes = useStyles();

  const params = `page=${page}&per_page=20&client_id=${ACCESS_KEY}`;

  const trigger = useScrollTrigger({ threshold: 500 });

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (query !== prevQuery.current) {
      setImages([]);
      setPage(INITIAL_PAGE);
    }
    prevQuery.current = query;
  }, [query])

  useEffect(() => setImages(images => [...images, ...data]), [data]);

  useEffect(() => { if (hasIntersection) { setPage(page => page + 1) } }, [hasIntersection])

  useEffect(() => {
    if (query) {
      setPath(`${API_URL}/search/photos/?query=${query}&${params}`);
    } else {
      setPath(`${API_URL}/photos/?${params}`);
    }
  }, [query, params]);

  return (
    <Container maxWidth="xl" className={classes.content}>
      <Typography variant="h2" align="center" color="primary" className={classes.title}>{query || 'Random'}</Typography>
      {images.length > 0 && <ImageList images={images} />}
      {hasError && <Typography variant="h4" color="secondary" align="center">Something goes wrong...</Typography>}
      <div ref={loader} className={classes.loading}>{loading && <CircularProgress />}</div>
      <Zoom in={trigger} >
        <Fab color="primary" className={classes.fab} onClick={handleScrollUp}>
          <ArrowUpwardIcon />
        </Fab>
      </Zoom>
    </Container>
  );
}

export default Gallery;

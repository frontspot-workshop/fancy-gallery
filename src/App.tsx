import React, { useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Gallery from './components/Gallery';
import {Router} from '@reach/router';

function App() {
  const [open, setOpen] = useState(false);

  const handleSidebarOpen = () => {
    setOpen(true);
  }

  const handleSidebarClose = () => {
    setOpen(false);
  }

  return (
    <Grid container direction="column" justify="center">
      <CssBaseline />
      <Header open={open} handleSidebarOpen={handleSidebarOpen} />
      <Sidebar open={open} handleSidebarClose={handleSidebarClose} />
      <Router>
        <Home path="/" />
        <Gallery path="gallery/:query"/>
        <NotFound default />
      </Router>
    </Grid >
  );
}

export default App;

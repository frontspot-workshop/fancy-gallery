import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Box, makeStyles, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  scrollTop: {
    display: "flex",
    width: "100%",
    maxWidth: "40px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    cursor: "pointer",
    justifyContent: "center",
    padding: theme.spacing(2, 1),
    color: "white",
    backgroundColor: theme.palette.text.secondary,
    opacity: 0.5,
    "&:hover": {
      opacity: 1,
    },
  }
}));

const ScrollTop = () => {
  const classes = useStyles();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const setScrollTopVisibility = () => {
    setShowScrollTop(window.pageYOffset > 400);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", setScrollTopVisibility);

  return (
    <Slide direction="up" in={showScrollTop} mountOnEnter unmountOnExit>
      <Box
        className={classes.scrollTop}
        onClick={scrollTop}
      >
        <ArrowUpwardIcon />
      </Box>
    </Slide>
  );
};

export default ScrollTop;

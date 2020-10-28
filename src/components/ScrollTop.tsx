import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Box, makeStyles } from "@material-ui/core";

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
  },
  scrollTopNone: {
    display: "none",
  },
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
    <Box
      className={showScrollTop ? classes.scrollTop : classes.scrollTopNone}
      onClick={scrollTop}
    >
      <ArrowUpwardIcon />
    </Box>
  );
};

export default ScrollTop;

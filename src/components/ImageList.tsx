import {
  Badge,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Image } from "../service/types";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAdaptiveGrid } from "../service/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    padding: theme.spacing(0, 2),
  },
}));

const ImageList = ({ images }: { images: Image[] }) => {

  const classes = useStyles();
  const { gridColsCount } = useAdaptiveGrid();

  const getColSpan = (index: number) : number => {
    return (index + 1) % 5 == 0 ? 2 : 1;
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={gridColsCount}>
        {images.map((image, index) => {
          const { id, webformatURL, tags, user, likes } = image;
          return (
            <GridListTile key={`${id}-${index}`} cols={getColSpan(index)}>
              <img src={webformatURL} alt={`${tags}`} />
              <GridListTileBar
                title={tags}
                subtitle={<span>by: {user}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tags}`}
                    className={classes.icon}
                  >
                    <Badge
                      badgeContent={likes}
                      color="primary"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                }
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default ImageList;

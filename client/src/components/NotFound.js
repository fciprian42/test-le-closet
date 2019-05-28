import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import notFound from "../resources/not_found.svg";

const styles = theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  img: {
    height: 300,
    marginTop: "20vh",
    marginBottom: theme.spacing.unit * 3
  }
});

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <img src={notFound} alt="not found" className={classes.img} />
    <Typography variant="h5">That's an error, bad URL</Typography>
  </div>
);

export default withStyles(styles)(NotFound);

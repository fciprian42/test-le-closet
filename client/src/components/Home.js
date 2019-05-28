import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import hello from "../resources/hello.svg";

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

const Home = ({ classes }) => (
  <div className={classes.root}>
    <img src={hello} alt="welcome" className={classes.img} />
    <Typography variant="h5" paragraph>
      Hello! Happy coding :)
    </Typography>
    <Typography>
      Do not hesitate to <a href="mailto:baptiste@lecloset.fr">contact us</a> if
      necessary
    </Typography>
  </div>
);

export default withStyles(styles)(Home);

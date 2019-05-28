import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 4
  },
  details: {
    whiteSpace: "pre-wrap"
  }
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.errorInfo) {
      return (
        <div className={classes.root}>
          <Typography variant="h2" color="error" paragraph>
            Oups! Something went wrong.
          </Typography>
          <Typography variant="h5" paragraph>
            We will repare this soon...
          </Typography>
          <Typography component="div">
            <details className={classes.details}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);

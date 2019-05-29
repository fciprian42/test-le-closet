import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { railsActions } from "redux-rails";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = theme => ({
  progress: {
    margin: "auto",
    marginTop: theme.spacing.unit * 4,
    width: "fit-content"
  },
  root: {
    margin: theme.spacing.unit * 3
  },
  text: {
    textTransform: "capitalize"
  },
  todo: {
    marginTop: theme.spacing.unit * 4
  }
});

class Postes extends Component {
  static propTypes = {
    fetchPostes: PropTypes.func,
    postes: PropTypes.array,
    loading: PropTypes.bool
  };

  componentDidMount() {
    this.props.fetchPostes();
  }

  render() {
    const { classes, loading, postes } = this.props;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={32} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <List>
          {_.map(postes, poste => (
            <ListItem key={poste.id}>
              <ListItemText
                className={classes.text}
                inset
                primary={poste.attributes.category}
              />
            </ListItem>
          ))}
        </List>
        <Typography className={classes.todo}>
          <em>
            TODO pour aller plus loin :<br />
            Suivi journalier du nombre de pièces traitées pour chaque poste
            (tout opérateur confondu)
          </em>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postes: state.api.Postes.models,
  loading: state.api.Postes.loading
});

const mapDispatchToProps = dispatch => ({
  fetchPostes: () => {
    dispatch(railsActions.index({ resource: "Postes" }));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Postes);

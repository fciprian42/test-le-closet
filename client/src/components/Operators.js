import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { railsActions } from "redux-rails";
import { Link } from 'react-router-dom'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
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
  todo: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    textDecoration: 'none'
  }
});

class Operators extends Component {
  static propTypes = {
    fetchOperators: PropTypes.func,
    operators: PropTypes.array,
    loading: PropTypes.bool
  };

  componentDidMount() {
    this.props.fetchOperators();
  }

  render() {
    const { classes, loading, operators } = this.props;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={32} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Typography variant='h5'>
          Liste des opérateurs
        </Typography>
        <List>
          {_.map(operators, operator => (
            <Link
                key={operator.id}
                to={{
                  pathname: `dashboard/${operator.attributes.id}`,
                  state: {
                    id: operator.attributes.id,
                    name: operator.attributes.name
                  }
                }}
                className={classes.link}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={`Avatar ID ${operator.id}`}>
                    {operator.attributes.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText inset primary={operator.attributes.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Typography className={classes.todo}>
          <em>
            TODO :<br />
            Lien vers dashboard personnel avec suivi des points
          </em>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  operators: state.api.Operators.models,
  loading: state.api.Operators.loading
});

const mapDispatchToProps = dispatch => ({
  fetchOperators: () => {
    dispatch(railsActions.index({ resource: "Operators" }));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Operators);

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { railsActions } from "redux-rails";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  progress: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  table: {
    minWidth: 350,
    marginTop: '1em'
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '15px'
  },
  text: {
    textTransform: "capitalize"
  },
  todo: {
    marginTop: theme.spacing.unit * 4
  }
});

class Postes extends PureComponent {
  static propTypes = {
    fetchPostes: PropTypes.func,
    postes: PropTypes.array,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props)

    this.state = {
      postes: [],
      loading: true
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const { operators_postes, postes } = props

    if (operators_postes && operators_postes.length > 0) {
      let operatorsArray = []

      postes.forEach(poste => {
        let count = 0
        operators_postes.forEach(operator_poste => {
          if (operator_poste.attributes.poste_id === poste.attributes.id) {
            count++
          }
        })
        operatorsArray.push({id: poste.attributes.id, category: poste.attributes.category, count: count})
      })

      return {
        postes: operatorsArray,
        loading: false
      }
    }

    return prevState
  }

  componentDidMount() {
    this.props.fetchPostes();
    this.props.fetchOperatorsPostes();
  }

  render() {
    const { classes } = this.props;
    const { postes, loading } = this.state;

    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={64} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Typography variant='h5'>
          Monitoring of operations
        </Typography>
        {postes && postes.length > 0 && <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Number of operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postes.map(poste => (
                <TableRow key={poste.id}>
                  <TableCell align="center">{poste.category}</TableCell>
                  <TableCell align="center">{poste.count}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postes: state.api.Postes.models,
  operators_postes: state.api.OperatorsPostes.models,
  loading: state.api.Postes.loading
});

const mapDispatchToProps = dispatch => ({
  fetchPostes: () => {
    dispatch(railsActions.index({ resource: "Postes" }));
  },
  fetchOperatorsPostes: () => {
    dispatch(railsActions.index({ resource: "OperatorsPostes" }))
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Postes);

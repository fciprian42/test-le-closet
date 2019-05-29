import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ComputerIcon from "@material-ui/icons/Computer";
import HomeIcon from "@material-ui/icons/Home";
import sessionConstants from "../../redux/constants/sessionConstants";

const drawerWidth = 350;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },

  drawerPaper: {
    width: drawerWidth,
    padding: theme.spacing.unit * 3,
    position: 'relative',
    height: '100vh'
  },

  link: {
    textDecoration: "none"
  },

  active: {
    "&> div": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  },

  login: {
    position: 'absolute',
    bottom: 15,
    width: 301,
    textAlign: 'center'
  },

  avatar: {
    marginBottom: '1em'
  }
});

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.dispatch({type: sessionConstants.LOGOUT})
    this.props.location.routesMap.push('/login')
  }

  render() {
    const { classes, session } = this.props

    let sessionRead = session && JSON.parse(session.session)

    return (
        <Drawer
            variant="permanent"
            classes={{
              root: classes.drawer,
              paper: classes.drawerPaper
            }}
            anchor="left"
        >
          {session.isLogged && <div className={classes.avatar}>
            <Link
                to={{
                  pathname: `dashboard/${sessionRead.id}`,
                  state: {
                    id: sessionRead.id,
                    name: sessionRead.name
                  }
                }}
                className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <Avatar>
                    {sessionRead.name.charAt(0)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={sessionRead.name} secondary='Operator' style={{padding: 0}}/>
              </ListItem>
            </Link>
          </div>}
          <List>
            <NavLink
                exact
                to="/"
                className={classes.link}
                activeClassName={classes.active}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </NavLink>
            <NavLink
                exact
                to="/postes"
                className={classes.link}
                activeClassName={classes.active}
            >
              <ListItem button>
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary="Postes" />
              </ListItem>
            </NavLink>
            <NavLink
                exact
                to="/operators"
                className={classes.link}
                activeClassName={classes.active}
            >
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Operators" />
              </ListItem>
            </NavLink>
          </List>
          {!session.isLogged && <div className={classes.login}>
            <Link to='/login' style={{textDecoration: 'none'}}>
              <Button color='primary' style={{width: '100%'}}>
                Login
              </Button>
            </Link>
          </div>}
          {session.isLogged && <div className={classes.login}>
              <Button onClick={this.handleLogout} color='secondary' style={{width: '100%'}}>
                Logout
              </Button>
          </div>}
        </Drawer>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session,
  location: state.location
})

export default compose(connect(mapStateToProps), withStyles(styles))(Sidebar)

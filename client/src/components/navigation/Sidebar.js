import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {NavLink, Link} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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
  },

  iconFontAwesome: {
    height: '24px',
    display: 'flex',
    width: '24px',
    fontSize: '18px',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.dispatch({type: sessionConstants.LOGOUT})

    window.location = '/login'
  }

  handleClick(e, value) {
    const { session } = this.props

    let sessionRead = session && JSON.parse(session.session)
    let currentService = session && session.currentService ? session.currentService : sessionRead.currentService

    if (currentService !== value) e.preventDefault()
  }

  render() {
    const { classes, session } = this.props
    let sessionRead, currentService

    if (session && session.isLogged) {
      sessionRead = session && JSON.parse(session.session)
      currentService = session && session.currentService ? session.currentService : sessionRead.currentService
    }

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
            <NavLink
                exact
                to={`/dashboard/${sessionRead.id}`}
                className={classes.link}
                activeClassName={classes.active}
            >
              <ListItem button>
                <ListItemIcon>
                  <Avatar>
                    {sessionRead.name.charAt(0)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={sessionRead.name} secondary={`Operator - ${currentService ? currentService + ' in progress' : 'Run away'}`} style={{padding: 0}}/>
              </ListItem>
            </NavLink>
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
            {session.isLogged && <>
              <Divider/>
              <NavLink
                  exact
                  to="/pickup"
                  className={classes.link}
                  activeClassName={classes.active}
                  onClick={(e) => {this.handleClick(e, 'pickup')}}
              >
                <ListItem button disabled={currentService !== "pickup"}>
                  <ListItemIcon className={classes.iconFontAwesome}>
                    <FontAwesomeIcon icon={['fal', 'hand-paper']} />
                  </ListItemIcon>
                  <ListItemText primary="Pickup" />
                </ListItem>
              </NavLink>
              <NavLink
                  exact
                  to="/checkup"
                  className={classes.link}
                  activeClassName={classes.active}
                  onClick={(e) => {this.handleClick(e, 'checkup')}}
              >
                <ListItem button disabled={currentService !== "checkup"}>
                  <ListItemIcon className={classes.iconFontAwesome}>
                    <FontAwesomeIcon icon={['fal', 'check']} />
                  </ListItemIcon>
                  <ListItemText primary="Checkup" />
                </ListItem>
              </NavLink>
              <NavLink
                  exact
                  to="/packup"
                  className={classes.link}
                  activeClassName={classes.active}
                  onClick={(e) => {this.handleClick(e, 'packup')}}
              >
                <ListItem button disabled={currentService !== "packup"}>
                  <ListItemIcon className={classes.iconFontAwesome}>
                    <FontAwesomeIcon icon={['fal', 'box']} />
                  </ListItemIcon>
                  <ListItemText primary="Packup" />
                </ListItem>
              </NavLink>
            </>}
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

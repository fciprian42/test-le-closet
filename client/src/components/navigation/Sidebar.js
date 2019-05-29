import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ComputerIcon from "@material-ui/icons/Computer";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 240;

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
    width: 191,
    textAlign: 'center'
  }
});

const Sidebar = ({ classes }) => (
  <Drawer
    variant="permanent"
    classes={{
      root: classes.drawer,
      paper: classes.drawerPaper
    }}
    anchor="left"
  >
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
    <div className={classes.login}>
      <Link to='/login' style={{textDecoration: 'none'}}>
        <Button color='secondary' style={{width: '100%'}}>
          Se connecter
        </Button>
      </Link>
    </div>
  </Drawer>
);

export default withStyles(styles)(Sidebar);

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
//import Menu from './Menu';
import Autocomplete from  'react-autocomplete';

// const logo = require('../images/logo.svg');


// import React from 'react';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import SearchStreamer from '../containers/SearchStreamer'

// const styles = theme => ({
//   appBar: {
//     position: 'relative',
//     boxShadow: 'none',
//     borderBottom: `1px solid ${theme.palette.grey['100']}`,
//     backgroundColor: 'white',

//   },
//   inline: {
//     display: 'inline'
//   },
//   flex: {
//     display: 'flex',
//     [theme.breakpoints.down('sm')]: {
//       display: 'flex',
//       justifyContent: 'space-evenly',
//       alignItems: 'center'
//     }
//   },
//   link: {
//     textDecoration: 'none',
//     color: 'inherit'
//   },
//   productLogo: {
//     display: 'inline-block',
//     borderLeft: `1px solid ${theme.palette.grey['A100']}`,
//     marginLeft: 32,
//     paddingLeft: 24
//   },
//   tagline: {
//     display: 'inline-block',
//     marginLeft: 10
//   },
//   iconContainer: {
//     display: 'none',
//     [theme.breakpoints.down('sm')]: {
//       display: 'block'
//     }
//   },
//   iconButton: {
//     float: 'right'
//   },
//   tabContainer: {
//     marginLeft: 32,
//     [theme.breakpoints.down('sm')]: {
//       display: 'none'
//     }
//   },
//   tabItem: {
//     paddingTop: 20,
//     paddingBottom: 20,
//     minWidth: 'auto'
//   }
// })

// class Topbar extends Component {

//   state = {
//     value: 0,
//     menuDrawer: false
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   mobileMenuOpen = (event) => {
//     this.setState({ menuDrawer: true });
//   }

//   mobileMenuClose = (event) => {
//     this.setState({ menuDrawer: false });
//   }

//   componentDidMount() {
//     window.scrollTo(0, 0);
//   }

//   current = () => {
//     if(this.props.currentPath === '/home') {
//       return 0
//     }
//     if(this.props.currentPath === '/dashboard') {
//       return 1
//     }
//     if(this.props.currentPath === '/wizard') {
//       return 2
//     }
//     if(this.props.currentPath === '/cards') {
//       return 3
//     }
//     if(this.props.currentPath === '/login') {
//       return 4
//     }

//   }

//   render() {

//     const { classes } = this.props;

//     return (
//       <AppBar position="absolute" color="default" className={classes.appBar}>
//         <Toolbar>
//             <Grid container spacing={24} alignItems="baseline">
//               <Grid item xs={12} alignItems='baseline' className={classes.flex}>
//                   <div className={classes.inline}>
//                     <Typography variant="h6" color="inherit" noWrap>
//                       <Link to='/' className={classes.link}>
//                         <img width={20} src={logo} />
//                         <span className={classes.tagline}>Material Sense</span>
//                       </Link>
//                     </Typography>
//                   </div>
//                   { !this.props.noTabs && (
//                     <React.Fragment>
//                       <div className={classes.productLogo}>
//                         <Typography>
//                           A material UI Template
//                         </Typography>
//                       </div>
//                       <div className={classes.iconContainer}>
//                         <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
//                           <MenuIcon />
//                         </IconButton>
//                       </div>
//                       <div className={classes.tabContainer}>
//                         <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} >
//                           <AppBar title="Menu" />
//                           <List>
//                             {Menu.map((item, index) => (
//                               <ListItem component={Link} to={{pathname: item.pathname, search: this.props.location.search}} button key={item.index}>
//                                 <ListItemText primary={item.label} />
//                               </ListItem>
//                             ))}
//                           </List>
//                         </SwipeableDrawer>
//                         <Tabs
//                           value={this.current() || this.state.value}
//                           indicatorColor="primary"
//                           textColor="primary"
//                           onChange={this.handleChange}
//                         >
//                           {Menu.map((item, index) => (
//                             <Tab key={index} component={Link} to={{pathname: item.pathname, search: this.props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
//                           ))}
//                         </Tabs>
//                       </div>
//                     </React.Fragment>  
//                   )}
//               </Grid>
//             </Grid> 
//         </Toolbar>
//       </AppBar>
//     )
//   }
// }
//export default withRouter(withStyles(styles)(Topbar))



const styles = theme => ({
  // appBar: {
  //   position: 'relative',
  //   boxShadow: 'none',
  //   borderBottom: `1px solid ${theme.palette.grey['100']}`,
  //   backgroundColor: 'white',

  // },
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div> */}
              <SearchStreamer /> 
              {/* <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              /> */}
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton component={Link} to="/dashboard" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));

//export default withRouter(withStyles(styles)(Topbar))

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import Loading from './common/Loading';
import Topbar from './Topbar';

import ReactTwitchEmbedVideo from "react-twitch-embed-video"

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});

const monthRange = Months;

class Dashboard extends Component {

  state = {
    loading: true,
    user: {}
  };

  // componentDidMount() {
  // }

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps', props)
    // // You don't have to do this check first, but it can help prevent an unneeded render
    console.log('getDerivedStateFromProps state changed', props)
    if (props.selectStreamer && props.selectStreamer.selectedUser) {
      return { loading: false, user: props.selectStreamer.selectedUser }
    }
    return state
  }

  // componentDidUpdate(prevProps) {
  // }

  render() {
    const { classes, selectStreamer } = this.props;

    // let user = {};
    // let loading = true
    // if (selectStreamer && selectStreamer.selectedUser) {
    //   user = selectStreamer.selectedUser;
    //   loading = false
    // }

    const { loading, user } = this.state;
    let userElem;
    if (user && user.data) {
      userElem = <ReactTwitchEmbedVideo width='100%' channel={user.data.name} />
    } else {
      userElem = ''
    }
    const currentPath = this.props.location.pathname
    console.log('render called user.data', user)
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" gutterBottom>Dashboard</Typography>
                    <Typography variant="body2">
                      Adjust and play with our sliders.
                    </Typography>
                  </div>
                  <div>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      Get help
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid container spacing={24} xs={12} justify="center">
                <Grid item xs={12} md={12} >
                  <Paper className={classes.paper} style={{ position: 'relative' }}>
                    <Loading loading={loading} />
                    <div className={loading ? classes.loadingState : ''}>
                      <Typography variant="subtitle1" gutterBottom>
                        Some details
                      </Typography>
                      <Typography variant="body2">
                        Details about the graph
                      </Typography>
                      <div >
                        {userElem}
                      </div>
                    </div>
                  </Paper>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <Paper className={classes.paper} style={{ position: 'relative' }}>
                    <Loading loading={loading} />
                    <div className={loading ? classes.loadingState : ''}>
                      <Typography variant="subtitle1" gutterBottom>
                        State
                    </Typography>
                      <div className={classes.mainBadge}>
                        <VerifiedUserIcon style={{ fontSize: 72 }} fontSize={'large'} color={'secondary'} />
                        <Typography variant="headline" color={'secondary'} gutterBottom>
                          Verified
                      </Typography>
                      </div>
                      <div className={classes.buttonBar}>
                        <Button to={{ pathname: "/dashboard", search: `?type=save` }} component={Link} variant="outlined" className={classes.actionButtom}>
                          Save
                      </Button>
                        <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                          Apply
                      </Button>
                      </div>
                    </div>
                  </Paper>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  //selectStreamer: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Dashboard));
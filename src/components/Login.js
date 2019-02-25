import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import auth from '../auth'

const queryString = require('query-string');

const backgroundShape = require('../images/shape.svg');

const logo = require('../images/twitch.svg');

const numeral = require('numeral');
numeral.defaultFormat('0');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
})

class Login extends Component {

  state = {
    activeStep: 0,
    receivingAccount: '',
    termsChecked: false,
    loading: true
  }

  componentDidMount() {
    let parsedParams = queryString.parse(this.props.location.search);
    console.log(this.props, parsedParams);
    if (parsedParams.accessToken) {
      auth.setSession(parsedParams)
      // Triggered somewhere
      this.props.history.push('/dashboard')
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  render() {

    const { classes } = this.props;
    const { activeStep, loading } = this.state;
    console.log('process.env.REACT_APP_CALLBACK_URL', process.env.REACT_APP_CALLBACK_URL);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {/* <Back /> */}
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.logo}>
                  <img width={100} height={100} src={logo} />
                </div>
                <div className={classes.stepContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={process.env.REACT_APP_CALLBACK_URL}
                    size='large'
                    style={{ background: classes.button, background: '#6542a6' }}
                  >
                    Log in with Twitch
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment >
          )
        }
      }
      
export default withRouter(withStyles(styles)(Login))
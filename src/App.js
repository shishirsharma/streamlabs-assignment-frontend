import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import logo from './images/logo.svg';
import './App.css';
import Routes from './routes';
import { blue, indigo } from '@material-ui/core/colors';

import { simpleAction } from './actions/simpleAction';


// A theme with custom primary and secondary color.
// It's optional.
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: purple[300],
//       main: purple[500],
//       dark: purple[700],
//     },
//     secondary: {
//       light: green[300],
//       main: green[500],
//       dark: green[700],
//     },
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});


// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })
 
 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })


//export default App;
//export default connect()(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);


import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
//import Dashboard from './components/Dashboard'
import PopulateDashboard from './containers/PopulateDashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Login from './components/Login'
import ScrollToTop from './components/ScrollTop'
import PrivateRoute from './components/PrivateRoute'
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={PopulateDashboard} />
                {/* <Route exact path='wizard' component={Wizard} />
                <Route exact path='cards' component={Cards} /> */}
            </Switch>
        </ScrollToTop>
    </HashRouter>
)


// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.path}/:topicId`} component={Topic}/>
//     <Route exact path={match.path} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

// const BasicExample = () => (
//   <Router>
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/topics">Topics</Link></li>
//       </ul>

//       <hr/>

//       <Route exact path="/" component={Home}/>
//       <Route path="/about" component={About}/>
//       <Route path="/topics" component={Topics}/>
//     </div>
//   </Router>
// )
// export default BasicExample

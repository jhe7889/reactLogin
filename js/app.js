import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import auth from './utils/auth.js'


const App = React.createClass({

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
      //loggedIn: false
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    })
  },

  componentWillMount() {
    console.log("i am here. ")
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <h1>New App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
         
           <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})




const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})




render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} >
               <Route path="messages/:id" component={Message} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
    </Route>
  </Router>
), document.getElementById('app'))
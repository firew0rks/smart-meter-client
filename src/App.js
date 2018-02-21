import React, { Component } from 'react'
import { Route, Link, IndexRoute, browserHistory } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import Main from './Main'
import './App.css'

const Address = () => <h1>We are located at 555 Jackson St.</h1>

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path='/main' component={Main} />
            <Route path='/home' component={Address} />
          </div>
        </Router>
    )
  }
}

export default App
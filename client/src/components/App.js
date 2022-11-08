import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import history from '../history'

import { fetchUser } from '../actions'

import Header from './Header'
import Landing from './Landing'
import Surveys from './surveys/Surveys'
import SurveyNew from './surveys/SurveyNew'
import Login from './auth/login/Login'
import Register from './auth/register/Register'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <div className='vh-100 bg-light text-dark'>
          <Header />
          <div className='container mt-4'>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/surveys" component={Surveys}></Route>
            <Route exact path="/survey/new" component={SurveyNew}></Route>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect(null, { fetchUser })(App);
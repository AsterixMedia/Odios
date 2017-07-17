import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'

import Header from '../components/Header'
import HomePage from '../pages/home'

import * as CounterActions from '../actions'

const mapStateToProps = state => ({
  counter: state.counter
})

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

const App = () =>
  <div>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
    </Switch>
    <h1>Hello</h1>
    <Button>Hello World</Button>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(App)

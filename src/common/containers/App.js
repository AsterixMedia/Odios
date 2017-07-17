import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import Header from '../components/Header'
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
    <h1>Hello</h1>
    <Button>Hello World</Button>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(App)

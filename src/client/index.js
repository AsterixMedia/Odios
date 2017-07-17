import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { styleManager, theme } from '../common/styles'

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount () {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    return <App {...this.props} />
  }
}

const store = configureStore(window.__PRELOADED_STATE__)

render(
  <Provider store={store}>
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

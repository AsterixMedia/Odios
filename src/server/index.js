import express from 'express'
// import path from 'path'
import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import qs from 'qs'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import { Helmet } from 'react-helmet'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'
import { styleManager, theme } from '../common/styles'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

// React SSR Sertup
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {}
    fetchCounter(apiResult => {
      // Read the counter from the request, if provided
      const params = qs.parse(req.query)
      const counter = parseInt(params.counter, 10) || apiResult || 0

      // Compile an initial state
      const preloadedState = { counter }

      // Create a new Redux store instance
      const store = configureStore(preloadedState)

      // Render the component to a string
      const markup = renderToString(
        <Provider store={store}>
          <MuiThemeProvider styleManager={styleManager} theme={theme}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </MuiThemeProvider>
        </Provider>
      )

      // CSS from JSS
      const css = styleManager.sheetsToString()

      // Grab the initial state from our Redux store
      const finalState = store.getState()

      // Helmet contents
      const helmet = Helmet.renderStatic()

      if (context.url) {
        res.redirect(context.url)
      } else {
        res.status(200).send(`<!doctype html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        <script src="${assets.client.js}" defer></script>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`)
      }
    })
  })

export default server

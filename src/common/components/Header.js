import React from 'react'
import { Helmet } from 'react-helmet'

const Header = () =>
  <Helmet
    defaultTitle='Odios'
    titleTemplate='%s | Odios'>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
  </Helmet>

export default Header

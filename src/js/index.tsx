import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { Theme } from './config/Theme'
import { App } from './App'

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <>
      <CssBaseline />
      <App />
    </>
  </MuiThemeProvider>,
  window.document.getElementById('root'),
)

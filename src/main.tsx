import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { createTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'
import { ThemeProvider } from '@mui/styles'
import { Provider } from 'react-redux'
import store from './redux/store/index.ts'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: green[500]
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
          
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)

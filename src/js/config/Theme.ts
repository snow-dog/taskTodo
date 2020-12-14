import { createMuiTheme } from '@material-ui/core'

export const primary = {
  50: '#f9fbe7',
  100: '#f0f4c3',
  200: '#e6ee9c',
  300: '#dce775',
  400: '#d4e157',
  500: '#cddc39',
  600: '#c0ca33',
  700: '#afb42b',
  800: '#9e9d24',
  900: '#827717',
  A100: '#f4ff81',
  A200: '#eeff41',
  A400: '#c6ff00',
  A700: '#aeea00',
  contrastDefaultColor: 'dark',
}

export const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: primary,
  },
  typography: {
    h1: {
      fontSize: '24px',
    },
    h2: {
      fontSize: '18px',
    },
    h3: {
      fontSize: '14px',
    },
  }
})

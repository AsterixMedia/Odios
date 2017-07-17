import { MuiThemeProvider, createMuiTheme, green, red } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'

const createStyleManager = () => {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: green,
        accent: red,
        type: 'light'
      })
    })
  })
}

export const { styleManager, theme } = createStyleManager()

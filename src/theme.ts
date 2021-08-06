// import { createMuiTheme, ThemeOptions } from '@material-ui/core'
//
// export const paletteColorsDark = {
//     primary: '#0f4c75',
//     secondary: '#3282b8',
//     error: '#E44C65',
//     background: '#1b262c',
//     text: '#bbe1fa',
// }
//
// export const paletteColorsLight = {
//     primary: '#6886c5',
//     secondary: '#ffe0ac',
//     error: '#E44C65',
//     background: '#f9f9f9',
//     text: '#050505',
// }
//
// const options = (dark: boolean): ThemeOptions => {
//     const paletteColors = dark ? paletteColorsDark : paletteColorsLight
//     return {
//         palette: {
//             type: dark ? 'dark' : 'light',
//             primary: {
//                 main: paletteColors.primary,
//             },
//             // ...
//         }
//     }
// }
// export const darkTheme = createMuiTheme(options(true))
// export const lightTheme = createMuiTheme(options(false))

import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#C40000',
    },
    secondary: {
      main: '#00c4c4',
    },
    error: {
      main: '#f89993',
    },
    background: {
      default: '#fff',
    },
  },
  spacing: 1,
});

export default theme;

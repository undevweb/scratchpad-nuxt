
import colors from 'vuetify/lib/util/colors'
export default {
  breakpoint: {},
  icons: {},
  lang: {},
  rtl: false,
  theme: {
    themes: {
      light: {
        primary: '#0d47a1',
        light:'#5472d3',
        dark:'#002171',
        secondary:  '#212121',
        // accent:  '#00ffff',
        // error: colors.red.accent3,
        background: '#fff', // Not automatically applied
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base, // If not using lighten/darken, use base to return hex
      },
    },
  }
}
// https://flatuicolors.com/palette/gb
// https://material.io/resources/color/#!/?view.left=1&view.right=0&primary.color=388E3C&secondary.color=1E88E5&primary.text.color=FFEA00
//'#004C85'

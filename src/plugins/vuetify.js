import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
  dark: true,
    themes: {
      light: {
        primary: colors.purple.lighten5,
        secondary: colors.purple.lighten4,
        accent: colors.purple.lighten4,
        error: colors.red.lighten2,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
      },
      dark: {
        primary: colors.purple.darken3,
        secondary: colors.purple.darken4,
        accent: colors.purple.accent,
        error: colors.red.darken1,
        info: colors.blue.darken1,
        success: colors.green.darken1,
        warning: colors.orange.darken1,
      },
    },
  },
});

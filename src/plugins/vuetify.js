import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
  dark: true,
    themes: {
      light: {
        primary: colors.purple.lighten1,
        secondary: colors.purple.lighten2,
        accent: colors.purple.accent,
        error: colors.error,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
      },
      dark: {
        primary: colors.purple.darken1,
        secondary: colors.purple.darken2,
        accent: colors.purple.accent,
        error: colors.error,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
      },
    },
  },
});

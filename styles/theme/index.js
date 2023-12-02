"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import SPACING from "./spacing";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 400,
      sm: 600,
      evmd: 780, //extra version of md
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette,
  typography,
  components,
  spacing: SPACING.GUTTER,
});

export default responsiveFontSizes(theme);

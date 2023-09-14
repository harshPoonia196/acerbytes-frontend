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
      md: 780,
      dmd: 900,
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

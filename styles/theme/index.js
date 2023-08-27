"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import SPACING from "./spacing";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

const theme = createTheme({
  palette,
  typography,
  components,
  spacing: SPACING.GUTTER,
});

export default responsiveFontSizes(theme);

"use client";

import { colors } from "@mui/material";

import ColorsList from "./colors";

const white = ColorsList.WHITE;
const black = ColorsList.BLACK;
// const gray = COLORS.GRAY
const darkGray = ColorsList.DARK_GRAY;
const lightGray = ColorsList.LIGHT_GRAY;
const blue = ColorsList.BLUE;
const successGreen = ColorsList.SUCCESS;

export default {
  black,
  white,
  primary: {
    light: white,
    dark: black,
    contrastText: white,
    main: blue,
  },
  secondary: {
    contrastText: white,
    dark: black,
    main: colors.blue.A400,
    light: colors.blue.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: darkGray,
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: ColorsList.BG_COLOR,
    paper: white,
  },
  divider: lightGray,
};

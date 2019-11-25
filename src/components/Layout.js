import React from "react";
import { theme, CSSReset, ThemeProvider } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: 'Georgia, Cambria, "Times New Roman", Times, serif'
  }
};

export const Layout = ({ children }) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    {children}
  </ThemeProvider>
);

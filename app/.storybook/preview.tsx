import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import MuiTheme from "../layouts/MuiTheme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={MuiTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

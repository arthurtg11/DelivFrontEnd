import { extendTheme } from "@chakra-ui/react";
import 'react-notifications-component/dist/theme.css'

const breakpoints = {
  esm: "320px",
  sm: "642px",
  md: "960px",
  lg: "1000px",
  xl: "1210px",
  "2xl": "1536px",
};

export const theme = extendTheme({
  fonts: {
    body: "Arial, Sans-serif",
    heading: "Arial, Sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "black",
      },
    },
  },
  breakpoints,
  colors: {
    // Cores para notificações
    notification: {
      danger: {
        bg: "red", // Cor de fundo para notificações de perigo
        text: "white", // Cor do texto para notificações de perigo
      },
    },
  },
});

//GlobalColors
export const colors = {
  bgColor: "#dbd5c9",
  white: "#FFFFFF",
};

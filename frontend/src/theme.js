import { createTheme } from "@mui/material/styles";
import { blue, lightBlue, blueGrey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      white: "#ffffff"
    },
    secondary: {
      main: lightBlue[500],
      midNightBlue: "#003366",
      blueGrey: blueGrey[600]
    },
  },
});

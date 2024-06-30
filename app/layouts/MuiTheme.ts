import { createTheme } from "@mui/material";
import { jaJP } from "@mui/material/locale";

const MuiTheme = createTheme({
  ...jaJP,
  palette: {
    primary: {
      main: "#bf0000",
      contrastText: "#fff",
    },
  },
});

export default MuiTheme;

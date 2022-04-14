import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import "./style/style.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/index";
import { GlobalContextWrapper } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalContextWrapper>
      <CssBaseline />
      <App />
    </GlobalContextWrapper>
  </ThemeProvider>
  // </React.StrictMode>
);

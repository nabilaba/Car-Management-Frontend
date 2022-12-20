import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: (props) => ({
      ".swal-modal": {
        backgroundColor: props.colorMode === "light" ? "#fff" : "#1a2020",
        color: props.colorMode === "light" ? "#000" : "#fff",
      },

      ".swal-modal .swal-title": {
        color: props.colorMode === "light" ? "#000" : "#fff",
      },

      ".swal-modal .swal-text": {
        color: props.colorMode === "light" ? "#000" : "#fff",
      },

      ".swal-modal .swal-icon--success:after, .swal-icon--success:before": {
        backgroundColor: props.colorMode === "dark" ? "#1A202C" : "#fff",
      },

      ".swal-modal .swal-icon--success__hide-corners": {
        backgroundColor: props.colorMode === "dark" ? "#1A202C" : "#fff",
      },

      ".swal-modal .swal-button": {
        backgroundColor: props.colorMode === "light" ? "#1A202C" : "#909090",
        color: props.colorMode === "light" ? "#fff" : "#000",
      },

      ".swal-modal .swal-button:hover": {
        backgroundColor: props.colorMode === "light" ? "#000" : "#fff",
        color: props.colorMode === "light" ? "#fff" : "#000",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

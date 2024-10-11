import React from "react";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { createRoot } from "react-dom/client"; 
import { Provider } from "react-redux";
import store from "./store";





const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot from "react-dom/client"

root.render(
 
  <Provider store={store}>
    <DarkModeContextProvider>
        <App />
    </DarkModeContextProvider>
  </Provider>

);
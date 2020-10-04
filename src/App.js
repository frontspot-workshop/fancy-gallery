import React from "react";

import AppContext from "./AppContext";
import Main from "./Main";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Main />
    </AppContext>
  );
}

export default App;

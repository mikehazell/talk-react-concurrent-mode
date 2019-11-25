import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const rootNode = document.getElementById("root");
// ReactDOM.render(<App />, rootNode);
// ReactDOM.createBlockingRoot(rootNode).render(<App />);
ReactDOM.createRoot(rootNode).render(<App />);

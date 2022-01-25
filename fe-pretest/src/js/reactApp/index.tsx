import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

export default function (app: any) {
  const element = <App />;
  ReactDOM.render(element, app);
}

import createApp from "./js";
import "./style/reset";
import axios from "axios";

window.axios = axios;

if (module.hot) {
  module.hot.accept();
}

createApp("Vue");

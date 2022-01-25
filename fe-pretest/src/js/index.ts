import ReactApp from "./reactApp";
import VueApp from "./vueApp";

interface window {
  app: any;
}

const appTypes = {
  Vue: "Vue",
  React: "React"
};

const createAppNode = () => {
  const testApp = document.getElementById("app");
  if (testApp !== undefined && testApp !== null) {
    testApp.remove();
  }
  const node = document.getElementsByTagName("body")[0];
  if (node.classList.value.includes("markdown-body")) {
    return false;
  }
  node.textContent = "";

  const app = document.createElement("div");
  app.id = "app";
  app.textContent = "Element created";
  node.appendChild(app);

  document.querySelector("body #app").innerHTML = "Server Running";
  return app;
};

const createApp: (appType: "Vue" | "React") => void = function (appType) {
  if (!Object.keys(appTypes).includes(appType)) {
    alert("NO APP TYPE");
    return;
  }

  const appNode: any = createAppNode();
  // choose which frame
  switch (appType) {
    case appTypes["Vue"]:
      VueApp(appNode);
      break;
    case appTypes["React"]:
      ReactApp(appNode);
      break;
  }
};

export default createApp;

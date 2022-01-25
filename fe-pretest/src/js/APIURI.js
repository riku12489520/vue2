export default (function () {
  const api = window.location.origin.split(":");
  api[2] = "8081";
  // api[0] += "-3000";
  return api.join(":") + "/ajaxserver";
  // return api + "/ajaxserver";
})();

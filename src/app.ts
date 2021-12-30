import app from "./server";
let  server = new app();
server.app.listen(4000, () => {
  console.log("server on port");
});

export default server;
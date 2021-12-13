import app from "./server";
const server = new app();
server.app.listen(4000, () => {
  console.log("server on port");
});

const app = require("./server");

app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});

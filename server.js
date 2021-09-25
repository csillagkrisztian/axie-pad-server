const express = require("express");
const app = express();
const axieListRouter = require("./routers/axie-list-router");
const axieDetailsRouter = require("./routers/axie-details-router");

app.set("port", process.env.port || 4000);

app.use(express.json());

app.use("/axielist", axieListRouter);
app.use("/axiedetails", axieDetailsRouter);

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});

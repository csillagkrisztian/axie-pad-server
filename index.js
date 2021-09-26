const express = require("express");
const app = express();
const cors = require("cors");
const axieListRouter = require("./routers/axie-list-router");
const axieDetailsRouter = require("./routers/axie-details-router");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the Axie API!");
});

app.use("/axielist", axieListRouter);
app.use("/axiedetails", axieDetailsRouter);

app.listen(PORT);

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
//entry point html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//server
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./router");

app.use("/forcast/", router);

app.use("/static", express.static("public"));

app.listen(PORT, "localhost", () => {
  console.log(`Server is listening on port ${PORT}`);
});

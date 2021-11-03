const express = require("express");
const path = require("path");
const Landing = require("./models/Landing");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./models/database");
const routes = require("./routes/portfolioRoutes.js");

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

//setting the path
const staticpath = path.join(__dirname, "../public");

//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);

app.use(express.static(staticpath));

//templating engine
app.set("view engine", "ejs");

//routing
app.use("/api/v1", routes);

//server create
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

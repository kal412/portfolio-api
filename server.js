const express = require("express");
const path = require("path");
const multer = require("multer");
const Landing = require("./models/Landing");
const bodyParser = require("body-parser");
require("./models/database");
const routes = require("./routes/portfolioRoutes.js");

const app = express();
const port = process.env.PORT || 4000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/assets/img/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and pdf files Only!");
  }
}

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

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected!",
        });
      } else {
        const landing = new Landing(req.body);
        landing
          .save()
          .then((result) => {
            res.render("index", {
              msg: "File Uploaded!",
              file: `assets/img/${req.file.filename}`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
});

//server create
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

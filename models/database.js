const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
//connect to mongodb
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connnection successful");
  })
  .catch((error) => {
    console.log(error);
  });

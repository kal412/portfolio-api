const mongoose = require("mongoose");

//connect to mongodb
const dbURI =
  "mongodb+srv://kal:laajkinababa123@portfolio.gsw1l.mongodb.net/dynamic?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connnection successful");
  })
  .catch((error) => {
    console.log(error);
  });

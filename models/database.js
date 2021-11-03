const mongoose = require("mongoose");

dBURI =
  "mongodb+srv://kal:laajkinababa123@portfolio.gsw1l.mongodb.net/dynamic?retryWrites=true&w=majority";
//connect to mongodb
mongoose
  .connect(dBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connnection successful");
  })
  .catch((error) => {
    console.log(error);
  });

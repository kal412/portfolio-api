const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  apikey: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Api", apiKeySchema);

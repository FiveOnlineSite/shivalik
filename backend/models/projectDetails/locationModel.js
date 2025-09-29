const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new mongoose.Schema({
  project: {
       type: mongoose.Types.ObjectId,
        ref: "projects",
        required: true,
  },
  map_link: {
    type: String,
    required: true,
  },
  location_info: [
    {
      phone: {
        type: String,
      },
      distance: {
        type: String,
      },
    },
    ],
});

const LocationModel = mongoose.model("locations", LocationSchema);

module.exports = LocationModel;

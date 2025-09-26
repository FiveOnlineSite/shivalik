const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CsrSchema = new mongoose.Schema({
  health_camp_description: {
    type: String,
    required: true,
  },
  women_empowerment_description: {
    type: String,
    required: true,
  },
  educational_description: {
    type: String,
    required: true,
  },
});

const CsrModel = mongoose.model("Csrs", CsrSchema);

module.exports = CsrModel;

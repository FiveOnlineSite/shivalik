// const mongoose = require("mongoose");

// const ProgressStepSchema = new mongoose.Schema({
//   date: {
//     type: Date,             // use Date for easy sorting
//     required: true,
//   },
//   image: {
//     type: String,           // S3/Cloudinary URL
//     required: true,
//   },
//   alt: {
//     type: String,
//     default: "",
//   }
// });

// const CurrentStatusSchema = new mongoose.Schema({
//   project: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Project",
//     required: true,
//   },
//   status: {
//     type: String,           // e.g. "Ongoing Construction"
//     required: true,
//   },
//   possessionBy: {
//     type: Date,             // September 2026
//     required: true,
//   },
//   maharera: {
//     type: String,
//     required: true,
//   },
//   timeline: [ProgressStepSchema], // <-- array of steps
// }, { timestamps: true });

// module.exports = mongoose.model("currentstatus", CurrentStatusSchema);

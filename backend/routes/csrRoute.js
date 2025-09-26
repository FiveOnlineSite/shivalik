const CSRController = require("../controllers/csrController");
const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const route = express.Router();

route.post("/", adminMiddleware, CSRController.createCSR);

route.patch(
  "/",
  adminMiddleware,
  CSRController.updateCSR
);

route.get("/", CSRController.getCSR);

route.delete(
  "/",
  adminMiddleware,
  CSRController.deleteCSR
);

module.exports = route;

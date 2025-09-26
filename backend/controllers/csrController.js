const CsrModel = require("../models/csrModel")

const createCSR = async (req, res) => {
  try {
    const { health_camp_description, women_empowerment_description, educational_description } = req.body;

    const newCsr = new CsrModel({
      health_camp_description,
      women_empowerment_description,
      educational_description
    });

    await newCsr.save();

    return res.status(200).json({
      message: "CSR added successfully.",
      newCsr,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding CSR due to ${error.message}`,
    });
  }
};

const updateCSR = async (req, res) => {
  try {
    const { health_camp_description, women_empowerment_description, educational_description} = req.body;

    const currentCSR = await CsrModel.findOne({});
    if (!currentCSR) {
      return res
        .status(404)
        .json({ message: "CSR not found." });
    }

     const updatedFields = {};

    if (typeof health_camp_description !== "undefined")
      updatedFields.health_camp_description = health_camp_description;
    if (typeof women_empowerment_description !== "undefined")
      updatedFields.women_empowerment_description = women_empowerment_description;
    if (typeof educational_description !== "undefined") updatedFields.educational_description = educational_description;

    const updatedCSR =
      await CsrModel.findByIdAndUpdate(currentCSR._id, 
      { $set: updatedFields },
      { new: true });

    return res.status(200).json({
      message: "CSR updated successfully.",
      updatedCSR,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating CSR due to ${error.message}`,
    });
  }
};

const getCSR = async (req, res) => {
  try {
    const csr = await CsrModel.findOne({})

    if (!csr) {
      return res.status(400).json({
        message: "No CSR is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "CSR fetched successfully.",
      csr,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching CSR due to ${error.message}`,
    });
  }
};


const deleteCSR = async (req, res) => {
  try {
    const Csr = await CsrModel.findOne({});

    if (Csr.length === 0) {
      return res.status(400).json({
        message: "No CSR added to delete. Kindly add one.",
      });
    }

    const deletedCsr =
      await CsrModel.findByIdAndDelete(
        Csr._id
      );

    return res.status(200).json({
      message: "CSR deleted successfully.",
      deletedCsr,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting CSR due to ${error.message}`,
    });
  }
};

module.exports = {
  createCSR,
  updateCSR,
  getCSR,
  deleteCSR,
};

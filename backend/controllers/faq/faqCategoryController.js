const FaqCategoryModel = require("../../models/faq/faqCategoryModel");
const FaqContentModel = require("../../models/faq/faqContentModel")

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const newCategory = new FaqCategoryModel({
      title,
    });

    await newCategory.save();

    return res.status(200).json({
      message: "Category added successfully.",
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding Category due to ${error.message}`,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title} = req.body;

    const currentCategory = await FaqCategoryModel.findById(_id);
    if (!currentCategory) {
      return res
        .status(404)
        .json({ message: "Category not found." });
    }

    const updatedFields = { title };

    const updatedCategory =
      await FaqCategoryModel.findByIdAndUpdate(_id, updatedFields, {
        new: true,
      });

    return res.status(200).json({
      message: "Category updated successfully.",
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Category due to ${error.message}`,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await FaqCategoryModel.findById(
      req.params._id
    );

    if (!category) {
      return res.status(400).json({
        message: "No Category is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Category due to ${error.message}`,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await FaqCategoryModel.find()

    if (categories.length === 0) {
      return res.status(400).json({
        message: "Categories not added. Kindly add Category.",
      });
    }
    return res.status(200).json({
      message: "Categories fetched successfully.",
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Categories due to ${error.message}`,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const Categorys = await FaqCategoryModel.findOne({});

    if (Categorys.length === 0) {
      return res.status(400).json({
        message: "No Category added to delete. Kindly add one.",
      });
    }

    const deletedCategory =
      await FaqCategoryModel.findByIdAndDelete(
        Categorys._id
      );

      const deletedFaqContent = await FaqContentModel.deleteMany({
      faq_category: _id,
    });

    return res.status(200).json({
      message: "Category deleted successfully.",
      deletedCategory,
      deletedFaqContent
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Category due to ${error.message}`,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
  deleteCategory,
};

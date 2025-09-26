const HomeBannerModel = require("../../models/home/homeBannerModel")
const path = require("path")

const createHomeBanner = async (req, res) => {

  try {
    const { title, description, link, alt, mobile_alt } = req.body;

    let imageData = {};
    let mobileImageData = {};

    if (req.files && req.files.image && req.files.image[0]) {
      const imageFile = req.files.image[0];
      const extname = path.extname(imageFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({ message: "Unsupported image type." });
      }
      if (!alt || alt.trim() === "") {
        return res
          .status(400)
          .json({ message: "Alt text is required for image." });
      }

      imageData =  {
                 filename: path.basename(imageFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageFile.key}` // keep "images/banners/..."
        }
    }

    // Handle icon upload
    if (req.files && req.files.mobile_image && req.files.mobile_image[0]) {
      const mobielImageFile = req.files.mobile_image[0];
      const extname = path.extname(mobielImageFile.originalname).toLowerCase();
      const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);

      if (!isImage) {
        return res.status(400).json({ message: "Unsupported icon type." });
      }
      if (!mobile_alt || mobile_alt.trim() === "") {
        return res
          .status(400)
          .json({ message: "Alt text is required for icon." });
      }

      mobileImageData =  {
                 filename: path.basename(mobielImageFile.key), // "1756968423495-2.jpg"
                 filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${mobielImageFile.key}` // keep "images/banners/..."
                }
    }

    const newHomeBanner = new HomeBannerModel({
      image: imageData ? [imageData] : [],
      alt,
      mobile_image: mobileImageData ? [mobileImageData] : [],
      mobile_alt,
      title,
      description,
      link,
    });

    await newHomeBanner.save();

    return res.status(201).json({
      message: "Home Banner created successfully",
      newHomeBanner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating home banner: ${error.message}` });
  }
}; 

const updateHomeBanner = async (req, res) => {
  try {
    const { title, description, link, alt, mobile_alt} = req.body;
    const bannerId = req.params._id;

    let updateData = {};

    if (req.files?.image?.[0]) {
      const file = req.files.image[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type." });
      }

      updateData.image = [
        {
                         filename: path.basename(file.key), // "1756968423495-2.jpg"
                         filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                        }
      ];
    }

    if (req.files?.mobile_image?.[0]) {
      const file = req.files.mobile_image[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported icon type." });
      }
      updateData.mobile_image = [
        {
                         filename: path.basename(file.key), // "1756968423495-2.jpg"
                         filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                        }
      ];
    }

    // Add text fields (only if provided)
    if (alt !== undefined) updateData.alt = alt;
    if (mobile_alt !== undefined) updateData.mobile_alt = mobile_alt;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (link !== undefined) updateData.link = link;

    const updatedHomeBanner = await HomeBannerModel.findByIdAndUpdate(
      bannerId,
      { $set: updateData },
      { new: true } // return updated doc
    );

    if (!updatedHomeBanner) {
      return res.status(404).json({ message: "Home Banner not found." });
    }

    return res.status(200).json({
      message: "Home Banner updated successfully",
      updatedHomeBanner: updatedHomeBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating home banner: ${error.message}`,
    });
  }
};

const getHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBannerModel.findById(req.params._id);

    if (!banner) {
      return res.status(400).json({
        message: "No banner is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Home banner fetched successfully.",
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching home banner due to ${error.message}`,
    });
  }
};

const getHomeBanners = async (req, res) => {
  try {
    const banners = await HomeBannerModel.find();

    if (banners.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All home banners fetched successfully.",
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching home banners due to ${error.message}`,
    });
  }
};

const deleteHomeBanner = async (req, res) => {
  try {
    const bannerExists = await HomeBannerModel.findById({
      _id: req.params._id,
    });

    if (bannerExists.length === 0) {
      return res.status(400).json({
        message: "No banners are created. Kindly create one.",
      });
    }

    const deletedHomeBanner = await HomeBannerModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Home banner deleted successfully.",
      deletedHomeBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting home banner due to ${error.message}`,
    });
  }
};

module.exports = {
  createHomeBanner,
  updateHomeBanner,
  getHomeBanner,
  getHomeBanners,
  deleteHomeBanner
}


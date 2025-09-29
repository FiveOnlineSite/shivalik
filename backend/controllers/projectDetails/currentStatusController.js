const CurrentStatusModel = require("../../models/projectDetails/currentStatusModel");
const ProjectsModel = require("../../models/projects/projectsModel")
const mongoose = require("mongoose");
const path = require("path");

const createStatus = async (req, res) => {
  try {
    const {date, status, possession, maharera} = req.body;

     const { project } = req.body;
        console.log("project id", project, typeof project);
    
        const projectExists = await ProjectsModel.findById(project);
    
        if (!projectExists) {
          return res.status(400).json({ message: "project not found" });
        }
    
    if (!["Ongoing Construction", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'Ongoing Construction' or 'Completed'" });
    }

    const ImagesData = JSON.parse(req.body.images);

    const files = req.files;
    if (!Array.isArray(ImagesData) || ImagesData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    if (!files || files.length !== ImagesData.length) {
      return res
        .status(400)
        .json({ message: "Each date must have a corresponding image." });
    }

    const uploadedImages = [];

    const MAX_FILE_SIZE = 500 * 1024;

    for (let i = 0; i < ImagesData.length; i++) {
      const images = ImagesData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for image: ${file.originalname}`,
        });
      }

      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
          message: `File size exceeds 500KB for ${file.originalname}`,
        });
      }

      uploadedImages.push({
        image: [
         {
           filename: path.basename(file.key),
           filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
          }
        ],
        alt: images.alt,
      });
    }

    const newsStatus = new CurrentStatusModel({
        project,
        date,
        status,
        possession, 
        maharera,
      images: uploadedImages,
    });

    await newsStatus.save();

    res.status(201).json({
      message: "Status added successfully",
      newsStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in adding status: ${error.message}`,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { project, date, status, possession, maharera } = req.body;
    const statusId = req.params._id;

    const existingStatus = await CurrentStatusModel.findById(statusId);
        if (!existingStatus) return res.status(404).json({ message: "Status not found" });
    
        const statusValue = status || existing.status;
    if (!["Ongoing Construction", "Completed"].includes(statusValue)) {
      return res.status(400).json({ message: "Invalid status. Use 'Ongoing Construction' or 'Completed'." });
    }
    // Parse images JSON (if sent)
    let ImagesData = [];
    if (req.body.images && req.body.images !== "undefined") {
      ImagesData = JSON.parse(req.body.images);
    }

    // Build a map of uploaded files (if any)
    const files = req.files || [];
    const fileMap = {};
    for (const file of files) {
      fileMap[file.fieldname] = file;
    }

    const uploadedImages = [];
    const modifiedStatus = []; 

    const MAX_FILE_SIZE = 500 * 1024;

    for (let i = 0; i < ImagesData.length; i++) {
      const images = ImagesData[i];

      const fileFieldName = `image_${i}`;
      const file = fileMap[fileFieldName];

      let imageData = [];

      if (file) {
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res
            .status(400)
            .json({ message: `Unsupported image type: ${file.originalname}` });
        }

        if (file.size > MAX_FILE_SIZE) {
          return res
            .status(400)
            .json({ message: `File size exceeds 500KB for ${file.originalname}` });
        }

        imageData = [
          {
            filename: path.basename(file.key),
            filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
          },
        ];
      }

      if (images._id) {
        const existingIndex = currentStatus.images.findIndex(
          (sm) => sm._id.toString() === images._id
        );

        if (existingIndex !== -1) {
          const existingItem = currentStatus.images[existingIndex];
          currentStatus.images[existingIndex] = {
            ...existingItem,
            alt: images.alt,

            image: imageData.length > 0 ? imageData : existingItem.image,
          };
          modifiedStatus.push(currentStatus.images[existingIndex]);
        }
      } else {
        uploadedImages.push({
          alt: images.alt || "",
          image: imageData,
        });
      }
    }

    if (project) {
          if (!mongoose.Types.ObjectId.isValid(project)) {
            return res.status(400).json({ message: "Invalid project ID" });
          }
    
          const projectExist = await ProjectsModel.findById(
            project
          );
          if (!projectExist) {
            return res.status(400).json({ message: "Project not found" });
          }
    
          existingStatus.project = project;
        }
    

    const updatedFields = {
      project,
      date,
      status,
      possession,
      maharera,
      images: [...currentStatus.images, ...uploadedImages],
    };

    const updatedStatus = await CurrentStatusModel.findByIdAndUpdate(
      currentStatus._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Status updated successfully.",
      modifiedStatus,
      updatedStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating Status: ${error.message || error}`,
    });
  }
};

const getStatusByProject = async (req, res) => {
  try {
    let name = req.params.name || "";

    const normalize = (str) =>
      str?.toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/['’]/g, "")  
        .replace(/\//g, "-")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const status = await CurrentStatusModel.find().populate("project", "title");

    const statuses = status.filter(
      (a) => normalize(a.project?.title) === normalize(name)
    );

    if (!statuses || statuses.length === 0) {
      return res.status(404).json({ message: "No status found for this project" });
    }

    res.status(200).json({
      message: "status fetched for this project successfully",
      status: statuses,
    });
  } catch (err) {
    console.error("Error fetching status by project title:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getImages = async (req, res) => {
  try {
    const { imageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      return res.status(400).json({ message: "Invalid imagesId" });
    }

    const images = await CurrentStatusModel.findOne({
      "images._id": new mongoose.Types.ObjectId(imageId),
    });

    if (!images) {
      return res.status(404).json({
        message: "Images not found in any Status document.",
      });
    }

    const matchedimages = images.images.find((s) => s._id.toString() === imagesId);

    if (!matchedimages) {
      return res.status(404).json({ message: "social media not found in array." });
    }

    return res.status(200).json({
      message: "images fetched successfully.",
      images: matchedimages,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching images due to ${error.message}`,
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const Status = await CurrentStatusModel.findById(req.params._id)
      .populate("project", "title")
      .lean();

        if (!Status) {
        return res.status(404).json({ message: "Status not found" });
        }

    return res.status(200).json({
      message: "Statuss fetched successfully.",
      Status,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Statuss due to ${error.message}`,
    });
  }
};

const getStatuses = async (req, res) => {
  try {
    const Statuses = await CurrentStatusModel.find()
      .populate("project", "title")
      .lean();

    if (Statuses.length === 0) {
      return res.status(400).json({
        message: "Status not added. Kindly add one.",
      });
    }

    const totalStatus = Statuses.reduce(
      (acc, doc) => acc + (doc.Status?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Statuss fetched successfully.",
    
      Statuses,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Statuss due to ${error.message}`,
    });
  }
};

const deleteImages = async (req, res) => {
  try {
    const { imageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      return res.status(400).json({ message: "Invalid imagesId" });
    }

    const images = await CurrentStatusModel.findOne({
      "images._id": imageId,
    });

    if (!images) {
      return res.status(404).json({
        message: "images not found in any Status.",
      });
    }

    const deletedimages = images.images.find((a) => a._id.toString() === imagesId);

    if (!deletedimages) {
      return res.status(404).json({
        message: "images not found in the array.",
      });
    }

    const updatedimages = await CurrentStatusModel.findByIdAndUpdate(
      images._id,
      {
        $pull: { images: { _id: imagesId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "images deleted successfully.",
      deletedimages,
      updatedimages,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting images from Status: ${error.message}`,
    });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const Status = await CurrentStatusModel.findById({
      _id: req.params._id,
    });

    if (Status.length === 0) {
      return res.status(400).json({
        message: "No Status added to delete. Kindly add one.",
      });
    }

    const deletedStatus = await CurrentStatusModel.findOneAndDelete({_id: req.params._id,});

    return res.status(200).json({
      message: "Status deleted successfully.",
      deletedStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Status due to ${error.message}`,
    });
  }
};

module.exports = {
  createStatus,
  updateStatus,
  getStatusByProject,
  getImages,
  getStatus,
  getStatuses,
  deleteImages,
  deleteStatus,
};

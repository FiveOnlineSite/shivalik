const ProjectsModel = require("../../models/projects/projectsModel")
const path = require("path")

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")        // replace &
    .replace(/\//g, "-")  
    .replace(/['’]/g, "")       // replace /
    .replace(/[^a-z0-9]+/g, "-") // other chars → -
    .replace(/^-+|-+$/g, "");
    

const createProject = async (req, res) => {
  try {
    const {
      project_category,
      title,
      location,
      excerpt,
      completion_date,
      alt,
      banner_alt,
      mobile_banner_alt
    } = req.body;

    // Validate category
    if (!["Shivalik", "Promoters"].includes(project_category)) {
      return res.status(400).json({
        message: "Give 'shivalik' or 'promoters' as category",
      });
    }

    let mainImage = [];
    let banner = [];
    let mobileBanner = [];

    // handle main image (single)
    if (req.files?.image && req.files.image[0]) {
      const file = req.files.image[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type for main image." });
      }
      if (!alt || !alt.trim()) {
        return res.status(400).json({ message: "Alt text is required for main image." });
      }

      mainImage.push({
        filename: path.basename(file.key),
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
      });
    }

    // handle banner (optional)
    if (req.files?.banner && req.files.banner[0]) {
      const file = req.files.banner[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type for banner." });
      }

      banner.push({
        filename: path.basename(file.key),
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
      });
    }

    // handle mobile banner (optional)
    if (req.files?.mobile_banner && req.files.mobile_banner[0]) {
      const file = req.files.mobile_banner[0];
      const extname = path.extname(file.originalname).toLowerCase();
      if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
        return res.status(400).json({ message: "Unsupported image type for mobile banner." });
      }

      mobileBanner.push({
        filename: path.basename(file.key),
        filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
      });
    }

    if (banner.length && !mobileBanner.length) {
  return res
    .status(400)
    .json({ message: "If you upload a banner, you must also upload a mobile banner." });
    }

    const lastItem = await ProjectsModel
          .findOne({ project_category })
          .sort({ sequence: -1 });
    
        const newSeq = lastItem ? lastItem.sequence + 1 : 1;
    

    // Create project
    const newProject = new ProjectsModel({
      project_category,
      title,
      location,
      excerpt,
      completion_date,
      image: mainImage,
      alt,
      banner: banner.length ? banner : undefined,
      banner_alt: banner_alt || undefined,
      mobile_banner: mobileBanner.length ? mobileBanner : undefined,
      mobile_banner_alt: mobile_banner_alt || undefined,
      sequence: newSeq,

    });

    await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating project: ${error.message}`,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, project_category, location, excerpt, completion_date, banner_alt, alt, mobile_banner_alt, sequence } = req.body;
    const projectId = req.params._id;

    const existingProject = await ProjectsModel.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const category = project_category || existingProject.project_category;

    if (project_category && !["Shivalik", "Promoters"].includes(category)) {
      return res.status(400).json({
        message: "Give 'shivalik' or 'promoters' as category",
      });
    }

    const updateData = {};

    if (req.files?.image && req.files.image[0]) {
      const file = req.files.image[0];
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }

      updateData.image = [
        {
          filename: path.basename(file.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        },
      ];
    }

    if (req.files?.banner && req.files.banner[0]) {
      const file = req.files.banner[0];
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }

      updateData.banner = [
        {
          filename: path.basename(file.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        },
      ];

      if (!req.files?.mobile_banner || !req.files.mobile_banner[0]) {
    return res.status(400).json({
      message: "You must upload a mobile banner when updating the banner."
    });
     }
    }

    if (req.files?.mobile_banner && req.files.mobile_banner[0]) {
      const file = req.files.mobile_banner[0];
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return res.status(400).json({ message: `Unsupported file type: ${file.originalname}` });
      }

      updateData.mobile_banner = [
        {
          filename: path.basename(file.key),
          filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        },
      ];
    }

    let newSeq;
    
        if (sequence !== undefined && sequence !== "") {
          newSeq = parseInt(sequence, 10);
          if (isNaN(newSeq) || newSeq < 1) {
            return res.status(400).json({ message: "Sequence must be a positive number." });
          }
    
          const docs = await ProjectsModel.find({ project_category: category }).sort({ sequence: 1 });
          const allowedMax = category === existingProject.project_category 
            ? docs.length 
            : docs.length + 1;

          if (newSeq > allowedMax) {
            return res.status(400).json({
              message: `Invalid sequence. Sequence cannot be greater than ${allowedMax}.`
            });
          }
    
          const ops = [];
          docs.forEach((doc) => {
            if (doc._id.equals(existingProject._id)) return;
            if (doc.sequence >= newSeq && doc.sequence < existingProject.sequence) {
              ops.push({ updateOne: { filter: { _id: doc._id }, update: { $inc: { sequence: 1 } } } });
            }
            if (doc.sequence <= newSeq && doc.sequence > existingProject.sequence) {
              ops.push({ updateOne: { filter: { _id: doc._id }, update: { $inc: { sequence: -1 } } } });
            }
          });
          if (ops.length) await ProjectsModel.bulkWrite(ops);
        } else {
          if (category !== existingProject.project_category) {
            
            await ProjectsModel.updateMany(
              {
                project_category: existingProject.project_category,
                sequence: { $gt: existingProject.sequence },
              },
              { $inc: { sequence: -1 } }
            );
            const count = await ProjectsModel.countDocuments({ project_category: category });
            newSeq = count + 1;
          } else {
            newSeq = existingProject.sequence;
          }
        }
    
        existingProject.sequence = newSeq ?? existingProject.sequence;
        existingProject.project_category = category;

    if (alt !== undefined) updateData.alt = alt;
    if (completion_date !== undefined) updateData.completion_date = completion_date;
    if (title !== undefined) updateData.title = title;
    if (location !== undefined) updateData.location = location;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (banner_alt !== undefined) updateData.banner_alt = banner_alt;
    if (mobile_banner_alt !== undefined) updateData.mobile_banner_alt = mobile_banner_alt;
    if (project_category !== undefined) updateData.project_category = project_category;

    Object.assign(existingProject, updateData);

       const updatedProject = await existingProject.save();


    return res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error updating project: ${error.message}`,
    });
  }
};

const getProjectWithBanners = async (req, res) => {
  try {
    const projects = await ProjectsModel.find(
      { banner: { $exists: true, $ne: null } }, // only projects with banner
      "title banner" // return only required fields
    );

    res.status(200).json({ Projects: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


const getBannersByTitle = async (req, res) => {
  try {
    const paramSlug = slugify(req.params.name || "");

    const banners = await ProjectsModel.find();

    console.log("paramSlug:", paramSlug);

    banners.forEach((b) =>
      console.log("db title:", JSON.stringify(b.title), "=>", slugify(b.title))
    );

    const matchedbanner = banners.find(
      (b) => slugify(b.title) === paramSlug
    );

    console.log("paramSlug1:", paramSlug);

    if (!matchedbanner) {
      return res.status(404).json({ message: "banner not found" });
    }

    res.status(200).json({
      message: "banner fetched successfully",
      banner: matchedbanner,
    });
  } catch (err) {
    console.error("Error fetching banner by title:", err.message);
    res.status(500).json({ message: `Server error ${err.message}` });
  }
};

const getProject = async (req, res) => {
  try {
    const Project = await ProjectsModel.findById(req.params._id);

    if (!Project) {
      return res.status(400).json({
        message: "No Project is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Project fetched successfully.",
      Project,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Project due to ${error.message}`,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const Projects = await ProjectsModel
      .find()
      .sort({ project_category: 1, sequence: 1 });

    if (Projects.length === 0) {
      return res.status(400).json({
        message: "No Projects are created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "All Projects fetched successfully.",
      count: Projects.length,
      Projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching Projects due to ${error.message}`,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const ProjectExists = await ProjectsModel.findById({
      _id: req.params._id,
    });

    if (ProjectExists.length === 0) {
      return res.status(400).json({
        message: "No Projects are created. Kindly create one.",
      });
    }

    const deletedProject = await ProjectsModel.findOneAndDelete({
      _id: req.params._id,
    });

    return res.status(200).json({
      message: "Project deleted successfully.",
      deletedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting Project due to ${error.message}`,
    });
  }
};


module.exports = {
  createProject,
  updateProject,
  getProjectWithBanners,
  getBannersByTitle,
  getProject,
  getProjects,
  deleteProject
}


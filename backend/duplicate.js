const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FAQModel = require("./models/projectDetails/faqModel"); // adjust path

dotenv.config();

const oldProjectId = "68d38ba315a992924a54ca9b";
const newProjectId = "68d384d475061a5dc94760a9";
    
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    const docs = await FAQModel.find({ project: oldProjectId });

    const duplicates = docs.map((doc) => {
      const newDoc = doc.toObject();
      delete newDoc._id;
      newDoc.project = newProjectId;
      return newDoc;
    });

    await FAQModel.insertMany(duplicates);

    console.log(`Duplicated ${duplicates.length} documents successfully.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error duplicating documents:", error);
    mongoose.connection.close();
  }
})();

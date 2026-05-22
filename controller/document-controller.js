const DOCUMENT = require("../schema/document-schema");
const mongoose = require("mongoose");
const path = require("node:path");
const fs = require("fs");

const createDocument = async (req, res) => {
  try {
    const loggedInuser = req["user"];

    const { projectId, description } = req.body;
    console.log("projectId", projectId, req.user);
    console.log(req.file);
    const newdocs = await DOCUMENT.create({
      projectId,
      uploadedBy: req["user"]._id,
      fileName: req["file"].filename,
      originalName: req["file"].originalname,
      fileUrl: `/upload/${req["file"].filename}`,
      description,
    });
    return res
      .status(201)
      .json({
        status: "Success",
        message: "Document uploaded succssfully",
        data: newdocs,
      });
  } catch (error) {
    console.log("error", error);
  }
};

const getAllDocument = async (req, res) => {
  try {
    const alldocs = await DOCUMENT.find({})
      .populate({ path: "uploadedBy", ref: "User", select: "-password" })
      .populate("projectId", "projectName clientName plantName")
      .exec();
    return res.status(200).json({ status: "Success", data: alldocs });
  } catch (error) {
    console.log("error", error);
  }
};

const updateDocument = async (req, res) => {
  try {
    const paramId = req.params.id;
    if (!mongoose.isValidObjectId(paramId)) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid id format" });
    }

    const updateDocs = await DOCUMENT.findByIdAndUpdate(paramId);
    if (!updateDocs) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Document not found" });
    }
    if (req.file) {
      const old_filepath = path.join(
        __dirname,
        "../upload",
        updateDocs.fileName,
      );

      // check if exits and delete
      if (fs.existsSync(old_filepath)) {
        fs.unlinkSync(old_filepath);
      }

      // update new docs
      updateDocs.fileName = req.file.filename;
      updateDocs.originalName = req.file.originalname;
      updateDocs.fileUrl = `/upload/${req.file.filename}`;
    }
    // Update description if provided
    if (req.body.description || req.body.projectId) {
      updateDocs.description = req.body.description;
      updateDocs.projectId = req.body.projectId;
    }

    await updateDocs.save();
    return res.status(200).json({
      status: "Success",
      message: "Document updated successfully",
      data: updateDocs,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

const singleDocuemt = async (req, res) => {
  try {
    const paramId = req.params.id;
    if (!mongoose.isValidObjectId(paramId)) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid id format" });
    }
    const find_docs = await DOCUMENT.findById({ _id: paramId });
    if (!find_docs) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Document not found" });
    }
    return res.status(200).json({ status: "Success", data: find_docs });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const paramId = req.params.id;
    console.log("paramId", paramId);
    if (!mongoose.isValidObjectId(paramId)) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid id format" });
    }
    const deleteRes = await DOCUMENT.findById({ _id: paramId });
    console.log("abbb", deleteRes);
    if (!deleteRes) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Document not found" });
    }
    console.log("deleteRes", deleteRes);

    if (deleteRes.fileName) {
      const old_filepath = path.join(
        __dirname,
        "../upload",
        deleteRes.fileName,
      );
      if (fs.existsSync(old_filepath)) {
        fs.unlinkSync(old_filepath, async(err) => {
          if (err) {
            return res
              .status(404)
              .json({
                status: "Failed",
                message: "File not found or could not be deleted",
              });
          };
          
        });
      }
    };
    await DOCUMENT.findByIdAndDelete({ _id: paramId });
     return res
       .status(200)
       .json({
         status: "Success",
         message: "Document deleted successfully",
       });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

module.exports = {
  createDocument,
  getAllDocument,
  updateDocument,
  singleDocuemt,
  deleteDocument,
};

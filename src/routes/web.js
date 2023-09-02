import express from "express";
import homeControllers from "../controller/homeControllers";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(appRoot);
    cb(null, appRoot + "/src/public/images/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.err = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  // limits: {
  //   fileSize: 300000,
  // },
}).single("avatar");
const uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
  // limits: {
  //   fileSize: 300000,
  // },
}).array("avatar1", 2);
router.get("/", homeControllers.getHome);

router.get("/deltail/user/:id", homeControllers.getDetail);

router.post("/create-new-user", homeControllers.createNewUser);

router.post("/delete-user", homeControllers.deleteUser);

router.get("/edit-user/:id", homeControllers.getEditUser);

router.post("/update-user", homeControllers.updateUser);

router.get("/upload-file", homeControllers.uploadFile);

//upload file
router.post(
  "/up-file",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.send("lỗi");
      } else if (err) {
        console.log(err);
        return res.send("lỗi");
      } else {
        next();
      }
    });
  },
  homeControllers.upFile
);

//upload multiple file
router.post(
  "/up-multiple-file",
  (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
      if (
        err instanceof multer.MulterError &&
        err.code === "LIMIT_UNEXPECTED_FILE"
      ) {
        res.send("LIMIT_UNEXPECTED_FILE");
      } else if (err) {
        console.log(err);
        res.send(err);
      } else {
        next();
      }
    });
  },
  homeControllers.upMultipleFile
);

export default router;

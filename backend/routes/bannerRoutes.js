const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  AddBanner,
  updateBanner,
  getBanner,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("banner1"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner2", upload.single("banner2"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner3", upload.single("banner3"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner4", upload.single("banner4"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner5", upload.single("banner5"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner6", upload.single("banner6"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner7", upload.single("banner7"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner8", upload.single("banner8"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner9", upload.single("banner9"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/banner10", upload.single("banner10"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.route("/createBanner").post(AddBanner);
router.route("/updateBanner").post(updateBanner);
router.route("/getBanner").get(getBanner);
module.exports = router;

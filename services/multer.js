var multer = require("multer");


//Define The Image Destination and Custom Name
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//Change This as Needed
const uploadMulter = multer({
  storage: diskStorage,
}).single("image");
let uploadImage = (req, res, next) => {
  uploadMulter(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (typeof req.file == "undefined") {
      next();
    } else {
      image =
        req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
      req.file.path = image;
      next();
    }
  });
};

module.exports = { uploadImage };

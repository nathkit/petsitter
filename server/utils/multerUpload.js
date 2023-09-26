import multer from "multer";

const multerUpload = multer({
  //   limits: {
  //     fileSize: 2 * 1024 * 1024, // 2 MB in bytes
  //   },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
export const fileUpload = multerUpload.fields([
  { name: "avatarFile" },
  { name: "imageGalleryFile" },
]);

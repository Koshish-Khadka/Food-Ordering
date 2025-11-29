// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //where to keep the uploaded files
//     cb(null, path.join(__dirname, "../uploads")); //this is callback function (error,success)
//   },
//   filename: function (req, file, cb) {
//     //what to name the files

//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage: storage });
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // ensure folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // avoid duplicate names
  },
});

export const upload = multer({ storage });

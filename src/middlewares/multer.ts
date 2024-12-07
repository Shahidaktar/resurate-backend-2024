import multer from "multer";
import {v4 as uuid} from 'uuid'
import cloudinary from "../utils/features.js";
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const id=uuid()
    const extName=file.originalname.split(".").pop()
    callback(null, `${id}.${extName}`);
  },
});

export const singleUpload = multer({ storage }).single("singleresume"); 

export const uploadFile = async (filepath: any) => {
  try {
    const res = await cloudinary.uploader.upload(filepath);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const singleUploadPhoto = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
}).single("photo");
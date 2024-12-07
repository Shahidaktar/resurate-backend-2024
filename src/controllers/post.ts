import { Post } from "../models/post.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import cloudinary from "../utils/features.js";
import { uploadFile } from "../middlewares/multer.js";

export const newPost = TryCatch(async (req, res, next) => {
  const { user } = req.query;
  const { content } = req.body;
  const photo = req.file;
  if (!photo) return next(new ErrorHandler("Please add Photo", 400));
  if (!user) return next(new ErrorHandler("Please login first", 401));
  if (!content) return next(new ErrorHandler("Please enter post content", 400));
  

  const upload = await uploadFile(photo.path);
  await Post.create({
    content,
    image: {
      public_id: upload?.public_id,
      url: upload?.secure_url,
    },
    user,
  });

  return res.status(201).json({
    success: true,
    message: "Post created successfully",
  });
});


export const getAllPosts = TryCatch(async (req, res, next) => {
  const posts = await Post.find({})
    .populate("user")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    posts,
  });
});


export const deletePost = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  const { postId } = req.params;

  if (!id) return next(new ErrorHandler("Please login first", 401));

  const post = await Post.findById(postId);
  if (!post) return next(new ErrorHandler("Post not found", 404));

  if (post.user.toString() !== id.toString()) {
    return next(new ErrorHandler("Unauthorized to delete this post", 403));
  }

  if (post.image && post.image.url)
     await cloudinary.uploader.destroy(post.image.public_id);

  await post.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

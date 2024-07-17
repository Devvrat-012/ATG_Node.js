import express from "express";
import { body, param } from "express-validator";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 500 })
      .withMessage("Content must be less than 500 characters"),
  ],
  createPost
);

router.get("/", auth, getPosts);

router.get(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Invalid post ID")],
  getPostById
);

router.put(
  "/:id",
  auth,
  [
    param("id").isMongoId().withMessage("Invalid post ID"),
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 500 })
      .withMessage("Content must be less than 500 characters"),
  ],
  updatePost
);

router.delete(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Invalid post ID")],
  deletePost
);

router.post(
  "/:id/like",
  auth,
  [param("id").isMongoId().withMessage("Invalid post ID")],
  likePost
);

router.post(
  "/:id/comment",
  auth,
  [
    param("id").isMongoId().withMessage("Invalid post ID"),
    body("text")
      .notEmpty()
      .withMessage("Text is required")
      .isLength({ max: 300 })
      .withMessage("Text must be less than 300 characters"),
  ],
  addComment
);

export default router;

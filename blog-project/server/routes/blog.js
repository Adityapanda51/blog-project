import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsAuthenticated from "../middlewares/authMiddleWare.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//Protected routes

router.get("/get/allblogs", checkIsAuthenticated, BlogController.getAllBlogs);
router.post(
  "/add/blog",
  upload.single("thumbnail"),
  checkIsAuthenticated,
  BlogController.addNewBlog
);
router.get("/get/blog/:id", checkIsAuthenticated, BlogController.getSingleBlog);

router.get(
  "/get/categories",
  checkIsAuthenticated,
  CategoryController.getAllCategories
);
router.post(
  "/add/category",
  checkIsAuthenticated,
  CategoryController.addNewCategory
);

export default router;

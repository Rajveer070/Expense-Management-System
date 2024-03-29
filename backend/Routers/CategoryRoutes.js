import express from "express";

import {
  getAllCategoriesController,
  addCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/getAllCategories").get(getAllCategoriesController);

router.route("/addCategory").post(addCategoryController);

// router.route("/deleteCategory/:id").delete(deleteCategoryController);
router.delete("/delete/:id", deleteCategoryController);
router.route("/updateCategory/:id").put(updateCategoryController);

export default router;

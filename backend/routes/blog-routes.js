import express from "express"
import { addBlog, deleteById, getAllBlogs, getBlogByID, getUserBlog, updateBlog } from "../controllers/blog-controller.js"

const blog_router = express.Router()

blog_router.get("/", getAllBlogs)

blog_router.get("/:id", getBlogByID)

blog_router.post("/add", addBlog)

blog_router.put("/update/:id", updateBlog)

blog_router.delete("/:id", deleteById)

blog_router.get("/user/:id", getUserBlog)

export default blog_router
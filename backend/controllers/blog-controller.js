import mongoose from "mongoose";
import Blog from "../modals/Blog.js";
import User from "../modals/User.js";

export const getAllBlogs = async(req, res, next) => {
    let blogs
    try{
        blogs = await Blog.find()
    } catch (err) {
        console.log(err);
    }
    if(!blogs || blogs.length === 0){
        return res.status(404).json({
            success:false,
            message: "NO Blogs Found in DataBase"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Here are the List of Blogs",
        blog:blogs
    })
}

export const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body
    
    let existingUser
    try{
        existingUser = await User.findById(user)
    } catch (err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({
            success:false,
            message: "Unable to find Use By this Id"
        })
    }

    const blog = new Blog({ 
        title, 
        description, 
        image, 
        user, 
    })
    try{
        const session = await mongoose.startSession()
        session.startTransaction()

        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})

        await session.commitTransaction()
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: err
        })
    }
    return res.status(200).json({
        success:true,
        message: "The blog is created",
        blog: blog,
    })
}

export const updateBlog = async (req, res, next) => {
    const { id } = req.params
    const { title, description } = req.body

    let blog
    try{
        blog = await Blog.findByIdAndUpdate(id, {
            title,
            description
        },{
            new: true,
        })
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({
            success:false,
            message:"Unable to update the Blog"
        })
    }
    return res.status(200).json({
        success: true,
        message: "THe blog is updated",
        blog: blog,
    })
}

export const getBlogByID = async (req, res, next) => {
    const { id } = req.params
    let blog
    try{
        blog = await Blog.findById(id)
    } catch (err) {
        console.log(err);
    }
    if(!blog){
        return res.status(404).json({
            success: false,
            message: "No blog with This ID",
        })
    }
    return res.status(200).json({
        success:true,
        message: "Here is the Blog.",
        blog: blog,
    })
}

export const deleteById = async (req, res, next) => {
    const { id } = req.params
    let deleteBlog
    try{
        deleteBlog = await Blog.findByIdAndDelete(id).populate("user")
        await deleteBlog.user.blogs.pull(deleteBlog)
        await deleteBlog.user.save()
    } catch (err) {
        console.log(err);
    }
    if(!deleteBlog){
        return res.status(500).json({
            success: true,
            message: "No Such Blog With This ID to delete"
        })
    }
    return res.status(200).json({
        success:true,
        message: "The Blog is deleted",
        blog: deleteBlog,
    })
}

export const getUserBlog = async (req, res, next) => {
    const { id } = req.params
    let userBlogs
    try{
        userBlogs = await User.findById(id).populate("blogs")
    } catch (err) {
        console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({
            success: false,
            message: "NO Blogs Found"
        })
    }
    return res.status(200).json({
        success:true,
        message: "The Blogs Are here",
        blog_s: userBlogs,
    })
}
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt  from 'bcrypt'
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";

import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json()) 
const constr=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@postitcluster.zn0eeva.mongodb.net/${process.env.DB_NAME}?appName=PostITCluster`
mongoose.connect(constr)

//express post method to handle http request and save posted message
app.post("/savePost",async(req,res)=>{
    try{
        const{postMsg,email} = req.body
        const post = new PostModel({postMsg,email})
        await post.save()
        res.send({
            post:post,
            msg:"Post is added.."}
        )
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"An error occurred"})
    }
})


//express post method to handle http request and register user data into userInfos collection
app.post("/registerUser",async(req,res)=>{
    try{
        const{name,email,password} = req.body
        const hashPwd = await bcrypt.hash(password,10)
        const user = new UserModel({name,email,password:hashPwd})
        await user.save()
        res.send({
            user:user,
            msg:"documents saved successfully"}
        )
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"An error occurred"})
    }
})
//express method to handle http post request for logout
app.post("/logout",async(req,res)=>{
    res.status(200).send({msg:"Logout successful"})
})

//express method to handle http post request and authenticate a user
app.post("/login",async(req,res)=>{
   try{
        const{email,password} = req.body
        const user = await UserModel.findOne({email:email})
        if(!user)//Invalid email
            res.status(401).send({msg:"Invalid email"})
        else{
             //Email is valid
             const hashPwd = await bcrypt.compare(password, user.password)
             if(!hashPwd) //Incorrect password
                res.status(401).send({msg:"Password is incorrect"})
             else//password is correct
                res.status(200).send({user:user,msg:"Authentication successful"})
        }
   }
   catch(error){
    console.log(error)
    // Unexpected server errors!
    res.status(500).send({ msg: "An unexpected error occurred" });
   }
})

//express method to handle http get request to get all the posts
app.get("/getPosts",async(req,res)=>{
    try{
     const posts = await PostModel.find().sort({ createdAt: -1 });
     const count = await PostModel.countDocuments()
     res.send({posts,count})
    }
    catch(error){
      res.status(500).send({msg:"unexpected error occurred"})
    }
})

//express method to handle http PUT request to update the posts message
app.put("/likePost",async(req,res)=>{
    try{
        const {postId,userId} = req.body
        const postToUpdate = await PostModel.findOne({_id:postId})
        if(!postToUpdate)
            return res.send(404).send({msg:"Post is not found"})

        const userIndex = postToUpdate.likes.user.indexOf(userId)
        if(userIndex === -1){
            //User not yet like the post.increase count and insert user id users array
            const updatePost = await PostModel.findOneAndUpdate(
                {_id:postId},
                {
                    $inc : {"likes.count":1},
                    $addToSet: {"likes.user": userId}
                },
                {new:true}
            )
            res.status(200).send({post:updatePost,msg:"post is update"})
        }
        else{
            //User not yet like the post already.decrase count and remove user id users array
            const updatePost = await PostModel.findOneAndUpdate(
                {_id:postId},
                {
                    $inc : {"likes.count":-1},
                    $pull: {"likes.user": userId}
                },
                {new:true}
            )
            res.status(200).send({post:updatePost,msg:"post is update"})
        }      
             
    }
    catch(error){
        res.status(500).send({msg:"unexpected error occurred"})
    }
})


app.listen(3001,()=>
    {
        console.log("server connected with db")
    })

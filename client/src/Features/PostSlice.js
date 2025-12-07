
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const likePost = createAsyncThunk(
  "posts/likePost",
async(postData)=>{
  try{
    const {postId, userId} = postData
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/likePost`,{postId,userId})
    const post = response.data.post
    return post
  }
  catch(error){
    console.log(error)
  }
})
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getPosts`)
      const posts = response.data.posts
      const count = response.data.count
      return {posts,count}
    }
    catch(error){
      console.log(error)
    }
  }
)

export const savePost = createAsyncThunk(
  "posts/savePost",
  async(postData)=>{
     try{
      const {postMsg, email} = postData
      const response = await  axios.post(`${process.env.REACT_APP_SERVER_URL}/savePost`,{postMsg, email})
      const post = response.data.post
      const msg = response.data.msg
      return {post,msg}
     }
     catch(error){
       console.log(error)
       const msg = error.response.data.msg
       return {msg}
     }
  }
)
export const postSlice = createSlice({
  name: "posts", //name of the state
  initialState:{
    status: "idle",
    posts: [],
    comments: [],     //Initial value of the state
    likes: [],
  }
, 
  reducers: {},
  extraReducers:(builder)=>{
    builder
     .addCase(savePost.pending,(state)=>{
      state.status ="pending"
    })
     .addCase(savePost.fulfilled,(state,action)=>{
         state.status="success"
         state.posts.unshift(action.payload.post)
     })
     .addCase(savePost.rejected,(state)=>{
         state.status="rejected"
     })
      .addCase(getPosts.pending,(state)=>{
      state.status ="pending"
    })
     .addCase(getPosts.fulfilled,(state,action)=>{
         state.status="success"
         state.posts = action.payload.posts
     })
     .addCase(getPosts.rejected,(state)=>{
         state.status="rejected"
     })
     .addCase(likePost.pending,(state)=>{
      state.status ="pending"
    })
     .addCase(likePost.fulfilled,(state,action)=>{
         state.status="success"
         const updateIndex = state.posts.indexOf(action.payload._id)
         state.posts[updateIndex] = action.payload.likes
     })
     .addCase(likePost.rejected,(state)=>{
         state.status="rejected"
     })
  }
});

export default postSlice.reducer;

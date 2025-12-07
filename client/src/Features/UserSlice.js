
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const logout = createAsyncThunk(
  "users/logout",
  async()=>{
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`)
      const msg  = response.data.msg
      console.log(msg)
})

export const login = createAsyncThunk(
  "users/login",
   async(userData,{rejectWithValue})=>{
  try{
    const {email,password} = userData
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,{email,password})
    const user = response.data.user
    const msg = response.data.msg
    return {user,msg}
  }
  catch(error){
    console.log(error)
     const msg = error.response.data.msg
    return rejectWithValue({msg})
  }
})

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async(userData)=>{
     try{
      const {name, email,password} = userData
      const response = await  axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`,
          {name, email,password})
      const user = response.data.user
      const msg = response.data.msg
      return {user,msg}
     }
     catch(error){
       console.log(error)
       const msg = error.response.data.msg
       return {msg}
     }
  }
  
)



export const userSlice = createSlice({
  name: "users", //name of the state
  initialState:{
    user:null,
    msg:null,
    status:null,    // initial value of the state
    isLogin:false
  }, 
  reducers: {},
  extraReducers:(builder)=>{
    builder
     .addCase(registerUser.pending,(state)=>{state.status ="pending"})
     .addCase(registerUser.fulfilled,(state,action)=>{
         state.status="success"
         state.user = action.payload.user
         state.msg = action.payload.msg
     })
     .addCase(registerUser.rejected,(state,action)=>{
         state.status="rejected"
         state.msg= action.payload.msg
     })
     .addCase(login.pending,(state)=>{
      state.status ="pending"
    })
     .addCase(login.fulfilled,(state,action)=>{
         state.status="success"
         state.user = action.payload.user
         state.msg = action.payload.msg
         state.isLogin = true
     })
     .addCase(login.rejected,(state,action)=>{
         state.status="rejected"
         state.user = null
         state.msg= action.payload.msg
         state.isLogin = false
     })
     .addCase(logout.pending,(state)=>{
      state.status ="pending"
    })
     .addCase(logout.fulfilled,(state,action)=>{
         state.status="success"
         state.isLogin = false
         state.user = null
     })
     .addCase(logout.rejected,(state,action)=>{
         state.status="rejected"
     })
  }
});

//export const { } = userSlice.actions; //export the function

export default userSlice.reducer;

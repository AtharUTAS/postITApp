import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    profilePic:{type:String,default:"user.png", required:true}
})

const UserModel = mongoose.model("userinfos",UserSchema)
export default UserModel
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


export const UserModel = mongoose.model('User', UserSchema)
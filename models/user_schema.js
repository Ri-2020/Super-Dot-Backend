import { Timestamp } from "mongodb";
import mongoose, { SchemaType } from "mongoose";


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 16,
        },
        password:{
            type: String,
            required: true,
            trim: false,
            minlength: 8,
            select: false,
        },
        email:{
            type: String,
        },
        age: {
            type: Number,
            min: 8,
        },
        gender: {
            type: String,
        },
        profileimage:{
            url: {
                type: String,
                default:
                "https://res.cloudinary.com/dolqf9s3y/image/upload/v1668325949/TikTok_mqkhq0.png",
            },
            public_id: String,
        },
        country:{
            type: String,
        },
        gamesPlayed: {
            type: Number,
            default : 0,
        },
        highScore: {
            type: Number,
            default: 0,
        },
        averageScore: {
            type: Number,
            default: 0,
        },
        totalScore:{
            type: Number,
            default: 0,
        },
        lastGameTimestamp:{
            type: Date,
        },
        totalTimePlayed:{
            type: Number,
            default: 0,
        },
        dotsKilled:{
            type: Number,
            default: 0,
        }
    },
    { Timestamp: true }
);

userSchema.index({ location: "2dsphere" }

);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

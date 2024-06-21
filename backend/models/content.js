import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
    htmlContent: String,
    isSaved: {
        type: Boolean,
        default: false
    }
});


export const Postcontent = mongoose.model("postcontent", contentSchema)

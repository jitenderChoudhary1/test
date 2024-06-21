import mongoose from "mongoose";


const BookMarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
      },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'postcontent'
        }
    ]
},{timestamps: true})

export const BookMark = mongoose.model('bookmark', BookMarkSchema) 
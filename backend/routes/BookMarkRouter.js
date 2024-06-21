import { Router } from "express";
import { BookMark } from "../models/BookMark.js";
import jwt from 'jsonwebtoken'
import { Postcontent } from "../models/content.js";
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { token, postId } = req.body;

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.userId;

        // Find the user's bookmarks
        let bookmark = await BookMark.findOne({ user: userId });

        // If the user doesn't have any bookmarks yet, create a new one
        if (!bookmark) {
            bookmark = new BookMark({ user: userId, posts: [] });
        }

        // Add the post to the user's bookmarks
        bookmark.posts.push(postId);
        await bookmark.save();

        await Postcontent.findByIdAndUpdate(postId, { $set: { isSaved: true } });
        const data = await Postcontent.find()

        res.status(201).json({ bookmark, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const { token } = req.body;
        const { postId } = req.params;

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.userId;

        // Find the user's bookmark and remove the post from it
        const bookmark = await BookMark.findOne({ user: userId });
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        bookmark.posts.pull(postId);
        await bookmark.save();

        // Update the 'issaved' field of the post to false
        await Postcontent.findByIdAndUpdate(postId, { $set: { isSaved: false } });
        const data = await Postcontent.find()

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;

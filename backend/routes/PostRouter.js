import { Router } from "express";
import {Postcontent} from '../models/content.js'
const router = Router();

router.post('/save', async (req, res) => {
    try {
        const { htmlContent } = req.body;

        const stripHTML = (html) => {
            // Remove all HTML tags
            const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
            // Remove specific empty tags like <br>
            const cleanedText = text.replace(/<br\s*\/?>/gi, "").trim();
            return cleanedText;
        };

        if (!htmlContent || stripHTML(htmlContent) === "") {
            return res.status(400).send({ error: "Content cannot be empty or contain only empty HTML tags" });
        }

        const newContent = new Postcontent({ htmlContent });
        await newContent.save();
        res.status(201).send(newContent);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/content', async (req, res) => {
    try {
        const content = await Postcontent.find();
        res.status(200).send(content);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/content/:id', async(req, res) => {
    try {
        const post = await Postcontent.findById(req.params.id)
        if(!post) res.status(404).json({message: 'post not found'})
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
})

router.put('/content/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const post = await Postcontent.findByIdAndUpdate(id, data,{
            new : true, //return the updated document
            runValidators: true // run mongoose validator
        });
        if(!post) res.status(404).json({message: 'post not found'})
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
})

router.delete('/content/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const response = await Postcontent.findByIdAndDelete(id);
        if(!response){
            res.status(404).json({error: "post not found"});    
        }
        const content = await Postcontent.find();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({message: "Error fetching data"})
    }
})

export default router;
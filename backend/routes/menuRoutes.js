import express from "express";
import { menu } from "../models/Menu.js";
const router = express.Router();


router.post("/", async(req, res) => {
    try {
        const data = req.body;
        const menuItem = new menu(data);
        const response = await menuItem.save();
        res.status(200).json(response)

        
    } catch (error) {
        res.status(500).json({error: "error"})
    }
})


router.get("/", async(req, res) => {
    try {
        const menuItem = await menu.find();
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({error: "error"})
    }
})

router.put("/:id", async(req, res) => {
    try {
        const menuID = req.params.id;
        const data = req.body;
        const response = await menu.findByIdAndUpdate(menuID, data, {
            new : true, //return the updated document
            runValidators: true // run mongoose validator
        } )
        if(!response){
            res.status(404).json({error: "menu not found"})
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const menuID = req.params.id;
        const response = await menu.findByIdAndDelete(menuID);
        if(!response){
            res.status(404).json({error:"invalid menu item"})
        }
        res.status(200).json({message:"menu is deleted successfully"})
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }
})

router.get("/:taste", async(req, res) => {
    try {
        const taste = req.params.taste;
        if(taste === "sweet" || taste === "sour" ||taste === "spicy"){
            const data = await menu.find({taste: taste})
            res.status(200).json(data)
        }else{
            res.status(404).json({error: "invalid value"})    
        }
    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
})

export default router;
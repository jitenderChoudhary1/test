import { Router } from "express";
import { person } from "../models/Person.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", async(req, res) => {
    try {
        const data = req.body // getting data from body
        
        if (!(data.username && data.password)) {
            return res.status(400).send({ error: "Data not formatted properly" });
        }
        const newPerson = new person(data);

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set the user password to hashed password
        newPerson.password = await bcrypt.hash(newPerson.password, salt);

        const response = await newPerson.save()
        res.status(200).json(response)

    } catch(error) {
        console.log("error", error);
        res.status(500).json({error: "error"})
    }
})

router.get("/", async(req, res) => {
    try{
        const data = await person.find()
        res.status(200).json(data)
    }catch(error){
        console.log("error");
        res.status(500).json({error: "error"})
    }
})


router.put("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const personUpdatedData = req.body;
        const response = await person.findByIdAndUpdate(id, personUpdatedData, {
            new : true, //return the updated document
            runValidators: true // run mongoose validator
        })
        if(!response){
            res.status(404).json({error: "person not found"});
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const response = await person.findByIdAndDelete(id);
        if(!response){
            res.status(404).json({error: "person not found"});    
        }
        res.status(200).json({message:"Person deleted successfully"});
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

router.get("/:workType", async(req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == "chef" || workType == "waiter" || workType == "manager" ){
            const data = await person.find({work: workType})
            res.status(200).json(data)
        }else{
            res.status(404).json({error: "Invalid work type"})    
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

export default router;
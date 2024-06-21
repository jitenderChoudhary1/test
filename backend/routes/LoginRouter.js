import { Router } from 'express';
import { person } from '../models/Person.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const router = Router();



router.post("/", async(req, res) => {
    try {
        const {username, password} = req.body;
        if (!(username && password)) {
            return res.status(400).send({ error: "Data not formatted properly" });
        }
        const user = await person.findOne({username: username})
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
                const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                    expiresIn: '20h',
                });
                res.status(200).json({ token });
            }else{
                res.status(400).json({ error: "Invalid Password" });
            }    
        }else{
            res.status(401).json({ error: "User does not exist" });
        }
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({error: "error"})
    }
})

export default router;
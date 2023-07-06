const express = require('express');
const router=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../model/Notes');
const { body, validationResult } = require('express-validator');


//route 1 get all the notes 
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

//route 2 to add the notes using post. 
router.post('/addnotes',fetchuser,[
    body("title").isLength({min:3}),
    body("description").isLength({min:3})
],async (req,res)=>{
    try {
        const {title,description,tag}=req.body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({result:result.array()});
        }
        const note=new Notes({user:req.user.id,title,description,tag})
        const savenotes= await note.save();
        res.json(savenotes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
})

//route 3 to update the notes using put. 
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
        const {title,description,tag}=req.body;
        // create a newnode object.
        try {
        const newnote={}
        if(title){newnote.title=title}
        if(description){newnote.description=description}
        if(tag){newnote.tag=tag}
        //find a note to be updated and update it 
        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not valid");
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note})
    } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });    
        }
})
//route 4 to deletenotes the notes using delete. 
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    
    //find a note to be deleted and delete it 
    try {
    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not valid");
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"sucess":"note have been deleted",note:note});
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); 
}
})
module.exports=router
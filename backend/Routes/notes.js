const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const Router = express.Router();
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

//1.  1. (/api/notes/addnote) Route to add a note , auth needed
Router.post(
  "/addnote",
  fetchUser,
  [
    //validating data for new user signup
    body("title", "Minimum length is 3").isLength({ min: 3 }),
    body("content", "Minimum length is 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        //destructuring body
        const { title, content, category } = req.body;
        
        //creating new note item
        let note =await Note.create({
            user:req.user.userid,title,content,category
        });
        res.send(note);
        
    } catch (err){
        // catching the internal server errors
        console.log(err);
        res.json({error:"Internal server error",message:err.message});        
    }   
  }
);

//2. (/api/notes/allnotes) Route to display all notes , auth needed
Router.get(
    "/allnotes",
    fetchUser,
    async (req, res) => {
        try {
            //displays all the notes by that user
            let notes= await Note.find({user:req.user.userid});
            res.send(notes);
            
        } catch (err){
            // catching the internal server errors
            console.log(err);
            res.json({error:"Internal server error",message:err.message});        
        }   
      }
    );

    //3. (/api/notes/editnote:id) Route to edit notes , auth needed
    Router.put(
        "/editnote/:id",
        fetchUser,
        async (req, res) => {
            if(!req.params.id){
                res.status(404).json({error:"not found"})
            }
            try {
                //destructiuring
                const {title,content,category}=req.body
                let newNote={};
                
                //checking which item is need to added or edited
                if (title){newNote.title=title}
                if (content){newNote.content=content}
                if (category){newNote.category=category}

                //finding if that note(entered in url) exists  and checking if that note belongs to the same user.
                let note= await Note.findById(req.params.id);
                if (!note){res.status(404).json({error:"Not found"})}
                if (note.user.toString()!==req.user.userid){res.status(401).json({error:"Unauthorized"})}
                
                //making modfied as true and adding the current date
                newNote.ismodified=true;
                var date=new Date();
                newNote.date=date.toISOString();
                
                //udpdating the data in mongo DB
                note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
                res.send(note);
            } catch (err){
                // catching the internal server errors
                console.log(err);
                res.json({error:"Internal server error",message:err.message});        
            }   
        });
        
     //4. (/api/notes/deletenote:id) Route to delete note , auth needed
        Router.delete(
            "/deletenote/:id",
            fetchUser,
            async (req, res) => {
                if(!req.params.id){
                    res.status(404).json({error:"not found"})
                }
                try {
                   
                    //finding if that note(entered in url) exists checking if that note belongs to the same user.
                    let note= await Note.findById(req.params.id)
                    if (!note){res.status(404).json({error:"Not found"})}
                    if (note.user.toString()!==req.user.userid){res.status(401).json({error:"Unauthorized"})}
                    
                    //deleteing note from mongo DB
                    note=await Note.findByIdAndDelete(req.params.id);
                    res.send(note);
                } catch (err){
                    // catching the internal server errors
                    console.log(err);
                    res.json({error:"Internal server error",message:err.message});        
                }   
            });



module.exports = Router;

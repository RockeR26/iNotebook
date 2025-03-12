const mongoose= require("mongoose");
const {Schema}=mongoose;

//Mongo DB schema created to create new note by user.
const noteSchema = new Schema({
    user: Schema.Types.ObjectId,
    title: {type:String, required:true}, // String is shorthand for {type: String}
    content:{type:String} ,
    category:{type:String},
    ismodified:{type:Boolean ,default:false},
    date: { type: Date, default: Date.now }, 
  });

  const Note= mongoose.model('Note',noteSchema);
  module.exports=Note;
  
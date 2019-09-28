const mongoose=require('mongoose')//tambien para esqmas de datos

const {Schema}=mongoose
const NoteSchema =new Schema({///como luciran los datos
    title:{type:String,required:true},
    description:{type:String,required:true},
    hora:{type:Number,required:true},
    minuto:{type:Number,required:true},
    duracion:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    user:{type:String}

})
module.exports=mongoose.model('Note',NoteSchema)
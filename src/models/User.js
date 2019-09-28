const mongoose=require('mongoose')
const {Schema}=mongoose
const bcrypt=require('bcryptjs')

const UserSchema= new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{
      type:String,required:true },
      date:{type:Date,default:Date.now}  
})

//metodo para cifrar las contraseña
UserSchema.methods.encryptPassword=async(password)=>{
const salt=await bcrypt.genSalt(10)    
const hash=bcrypt.hash(password,salt)
return hash//contrseña cifrada
}
UserSchema.methods.matchPassword= async function(password){
    return await bcrypt.compare(password,this.password)
}
//                              contraseña y contraseña cifrada
module.exports= mongoose.model('User',UserSchema)
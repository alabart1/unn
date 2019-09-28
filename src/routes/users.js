const express=require('express')
const router=express.Router()//enrutador creador

const  User=require('../models/User')
const passport=require('passport')

router.get('/users/signin',(req,res)=>{
   res.render('users/signin.hbs')
})
router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
    
}))


router.get('/users/signup',(req,res)=>{
    res.render('users/signup.hbs')
})
router.post('/users/signup',async (req,res)=>{
    const{name,email,password,confirm_password}=req.body
    const errors=[]
    console.log(req.body)
    if(name.length<=0){
        errors.push({ text:'ingrese  Usuario'})
    }
    if(password !==confirm_password){
errors.push({text:'Las Contraseñas no son Iguales'})
    }
    if(password.length<4){
        errors.push({text:'la contraseña debe tener almenos 4 caracteres'})   
    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,name,email,password,confirm_password})

    }else{
       const emailUser= await User.findOne({email:email})
        if(emailUser){
            errors.push({text:'El Correo ya esta en Uso'})   
            res.redirect('/users/signup')
        }
    const newUser=new User({name,email,password})
    newUser.password=await newUser.encryptPassword(password)
    //reemplazando de pass=>bcryppass
    await  newUser.save()
    req.flash('success_msg','Registro Satisfactorio!!!')
    res.redirect('/users/signin')
    }
})
router.get('/users/logout',(req,res)=>{
    req.logOut()
    res.redirect('/')
})

module.exports=router
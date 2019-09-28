const passport=require('passport')//authenticar
const localStrategy=require('passport-local').Strategy

const User=require('../models/User')

passport.use(new localStrategy({
    usernameField:'email'
},async(email,password,done)=>{
    const user=await User.findOne({email:email})
    if(!user){
        return done(null,false,{message:'No existe Usuario '})
    }else{
        const match=await user.matchPassword(password)
        if(match){//si coencide
            return done(null,user)
        }else{
            return done(null,false,{message:'Contraseña Erronea'})
        }
    }}))//alacenado una sesion
    passport.serializeUser((user,done) =>{//toar user y callback
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{//toma un id y genera un callback
        User.findById(id,(err,user)=>{
done(err,user)
        })
    })
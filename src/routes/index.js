const express=require('express')
const router=express.Router()//enrutador creador


router.get('/',(req ,res)=>{
    res.render('index.hbs')//envia
})
router.get('/about',(req,res)=>{
    res.render('about.hbs')
})

module.exports=router
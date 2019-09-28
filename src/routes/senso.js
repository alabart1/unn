const express=require('express')
const router=express.Router()//enrutador creador


router.get('/senso',(req ,res)=>{
    res.render('index1.hbs')//envia
})
router.get('/grafica',(req ,res)=>{
    res.render('index2.hbs')//envia
})
router.get('/active',(req ,res)=>{
    res.render('active.hbs')//envia
})

module.exports=router
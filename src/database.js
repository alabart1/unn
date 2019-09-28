const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/sistema',
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=>console.log('conectada ala base de datos'))
.catch(err=>console.log(err))
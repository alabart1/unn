const mongoose=require('mongoose')

mongoose.connect('mongodb://mongodb+srv://admin:admin@cluster0.gc3l7.mongodb.net/test',
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=>console.log('conectada ala base de datos'))
.catch(err=>console.log(err))
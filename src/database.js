const mongoose=require('mongoose')

mongoose.connect('mongodb://mongodb+srv://admin:admin@sistinv.a9tvo.mongodb.net/sistinv?retryWrites=true&w=majority',
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=>console.log('conectada ala base de datos'))
.catch(err=>console.log(err))
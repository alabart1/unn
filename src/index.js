
const express=require('express')
const SocketIO=require('socket.io')
const path=require('path')
const exphbs=require('express-handlebars')
const methodOverride= require('method-override')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const Serialport=require('serialport')

//initilizacioness
 const app= express()
require('./database')
require('./config/passport')
//settings
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))//iran los htmls-hbs
app.engine('.hbs',exphbs({
    defaultLayout:'main',//marcos plantillas .hbs ()
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),//pequeñas partes html que se pueden reutilizar
    extname:'.hbs'//que exteniones tiene los archivos
}))
//para utilizar la cconfiguracion
app.set('view engine','.hbs')

//middlewares funciones de datos para elsevidor
app.use(express.urlencoded({extended:true}))//sirve para que el formulario me envio podamos entenderlos
app.use(methodOverride('_method'))//sirve para que los formularios envien metodos get put post delete
app.use(session({//almacenar temporalmente las authrnticasiones sesiones
  secret:'mysecretapp',
  resave:true,
  saveUninitialized:true  
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//Global variables
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg')
  res.locals.error_msg=req.flash('error_msg')
  res.locals.error=req.flash('error')
  res.locals.user=req.user||null
  next()
})

//routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))
app.use(require('./routes/senso'))


//stkvatic files config
app.use(express.static(path.join(__dirname,'public')))
//Server ins  listening
const server=app.listen(app.get('port'),()=>{
  console.log(`server on port: ${app.get('port')}`)
})
//sockets
 const io=SocketIO(server)
///datos Sensores
const Readline=Serialport.parsers.Readline//ln
//lectura
const port=new Serialport('COM10',{
  baudRate: 9600
})
const parser=port.pipe(new Readline({delimeter:'\r\n'}))
parser.on('open',function(){

  console.log('connection open')
})
var datotemp
parser.on('data',function(data){
  //
  //let temp=parseFloat(data)+'°C'

  var datotemp1=data.split(" " )
  datotemp=datotemp1[0]
console.log(datotemp1[1])
  //io.emit('temp',data)
})
port.on('error',function(err){
  console.log(err) 
})

  //constrol manual
  var five = require('johnny-five')
  var board = new five.Board()

board.on('ready', function () {
 setInterval( function(){
if(datotemp>=23){
  led= new five.Led({
    pin: 6
  });
 led.on()
}if(datotemp<=20){
  led= new five.Led({
        pin: 6
      });
     led.off()
}

   },1000)
   ///esclavamineto de  Actuador
    io.on('connection',  function (socket) {
        socket.on('motor', function (estado){
     
       led= new five.Led({
        pin: 5
      })
   if(estado%2){
     led.on()
}
  else{
    led.off()
  }     
        }); 
        
    })
    // board.pinMode(2, five.Pin.INPUT);
  
    //     this.digitalRead(2, function(value) {
    //       var datoflu=value
    //       console.log(datoflu)
    //       io.emit('fluj',datoflu)
    // })
    /// FLUJO DE AGUA 1 /// 
        board.pinMode(2, five.Pin.INPUT);
        var pulses = 0;
        board.digitalRead(2, function(value) {
          // send the pin status to flowSignal helper
          flowSignal(value);
      
         
        });
  
        setInterval(function() {
          var litres = 0;
          
          if(pulses>5){
            litres=1
          }else{
            litres=0
          }
          var  datoflu=litres
         // console.log(litres+"flujo q hay -0 no hay")
          io.emit('fluj',datoflu)
          pulses =0;
          //temp[76] = litres
        }, 1000);

        function flowSignal (value) {
          if (value === 0) {
            return;
          }
          if (value === 1) {
            pulses ++;
          }
          
        }
//mandanod datos de flujo y temp
setInterval(function(){
  io.emit('temp',datotemp)
},1000)

});

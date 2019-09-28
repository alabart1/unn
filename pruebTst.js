
// var five = require('johnny-five');
// var board = new five.Board({
//   	repl:false
// });

// board.on('ready', function () {
//     var speed, commands, motors;
//     var anode = new five.Led.RGB({
//         pins: {
//             red: 9,
//             green: 11,
//             blue: 10
//         },
//         isAnode: true
//     });

//     commands = null;

//     anode.on();
//     anode.color("#efe13d");

//     anode.blink(1000);

//     var blink = true;

//     io.on('connection', function (socket) {
//         socket.on('azul', function (){
//             anode.on();
//             console.log('azul')
//         });

//         socket.on('verde', function (){
//             anode.on();
//          console.log('verde')
//         });

//         socket.on('rojo', function (){
//             anode.on();
//             console.log('rojo')
//         });

//         socket.on('stop', function (){
//             if (blink){
//                 anode.stop(); // to stop blinking
//                 blink = false;
//             }
//             else{
//                 anode.blink(1000);
//                 blink = true;
//             }
//         });

//         socket.on('off', function (){
//             anode.off();  // to shut it off (stop doesn't mean "off")
//         });

//         socket.on('on', function (){
//             anode.on(); // to turn on, but not blink
//         });

//     });
// });
/////////////
var five = require("johnny-five"),
  board, button;

board = new five.Board();

board.on("ready", function() {
  button = new five.Button(2);

  button.on("down", function() {
    console.log("down");
  });
  button.on("hold", function() {
    console.log("hold");
  });
  button.on("up", function() {
    console.log("up");
  });
});

// const socket=io('http://localhost:3000')
const express = require("express");
const router = express.Router(); //enrutador creador
const Note = require("../models/Note"); //para pedirle  CRUD
const { isAuthenticated } = require("../helpers/auth");
router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-notes.hbs");
});
var duracion;
var Hora;
var Minuto;
var notes;
//recibiendo datos de un formulario
router.post("/notes/new-notes", isAuthenticated, async (req, res) => {
  const { title, description, hora, minuto, duracion } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "escriba el titulo porfavor" }); //envando respuesta ,sin pintar en pantallla
  }
  if (!description) {
    errors.push({ text: "porfavor escriba la descripcion" });
  }
  if (!hora) {
    errors.push({ text: "porfavor ingrese la hora de riego " });
  }
  if (!minuto) {
    errors.push({ text: "porfavor ingrese el minuto de riego" });
  }
  if (!duracion) {
    errors.push({ text: "porfavor ingrese la duracion de riego" });
  }
  if (errors.length > 0) {
    res.render("notes/new-notes", {
      errors,
      title,
      description,
      hora,
      minuto,
      duracion //mostramos campos y errores
    });
  } else {
    const newNote = new Note({ title, description, hora, minuto, duracion });

    //user con id y noteid=usernote
    newNote.user = req.user.id;
    //creadno un nuevo dato
    await newNote.save(); //guardar en la base de datos
    req.flash("success_msg", "NOTA DE RIEGO AGREGADA SATISFACTORIA");
    res.redirect("/notes");
  }
});

//vista consulta get recorrer la notas
router.get("/notes", isAuthenticated, async (req, res) => {
  //consultando en la base de datos
  notes = await Note.find({ user: req.user.id }).sort({ hora: "asc" }); //consulta por tim de > a <
  res.render("notes/all-notes.hbs", { notes }); //para la vista
  //   //constrol horario
  setInterval(function() {
    for (var i in notes) {
      Hora = notes[i].hora;
      Minuto = notes[i].minuto;
      duracion = notes[i].duracion;
    }
  }, 1000);
});

//obteniendo el id dela nota
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id); //pasado el i para editar
  res.render("notes/edit-note", { note }); //pasando los datos
});
///editando y guarda los datos
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description, hora, minuto, duracion } = req.body; //recibiendo formulario
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    description,
    hora,
    minuto,
    duracion
  }); //findByanUodate busca por id
  req.flash("success_msg", "NOTA DE RIEGO MODIFICADA SATISFACTORIO");
  //redireccionado alas notas anteriores
  res.redirect("/notes"); //para listar las notas
});
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
  req.flash("success_msg", "NOTA DE RIEGO ELIMINADA SATISFACTORIO");
});

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var Hora1;
  var Minuto1;
  setInterval(function() {
    var HoraYFecha = new Date();
    Hora1 = HoraYFecha.getHours();
    Minuto1 = HoraYFecha.getMinutes();
    Segundos = HoraYFecha.getSeconds();
    for (var i in notes) {
      if (
        Hora1 == notes[i].hora &&
        Minuto1 == notes[i].minuto &&
        Segundos == 0
      ) {
        led = new five.Led({
          pin: 5
        });
        led.on();
      }
      if (
        Hora1 == notes[i].hora &&
        notes[i].minuto + notes[i].duracion == Minuto1 &&
        Segundos == 0
      ) {
        led = new five.Led({
          pin: 5
        });
        led.off();
      }
    }
  }, 1000);
});

module.exports = router;

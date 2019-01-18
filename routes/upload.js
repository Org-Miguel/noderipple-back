var express = require('express');

var fileUpload = require('express-fileupload');
//importamos el file system
var fs = require('fs');

var app = express();

// default options
app.use(fileUpload());

app.post('/files', (req, res, next) => {

    console.log(" ############## servicio upload ##############");
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.files;
    console.log(archivo);
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['txt'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado   
    var nombreArchivo = `${nombreCortado}`;

    // Mover el archivo del temporal a un path
    var path = `./uploads/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        return  res.status(200).json({
            ok: true,
            mensaje: 'Archivo obtenido'           
        });
       
    })



});

module.exports = app;

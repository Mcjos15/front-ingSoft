var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

//escuchar imagen info
socket.on('addimage',function(from,base64image){
    console.log('se supone volvio la imagen');
    $('.mensajes')
    .append(
        $('<p>').append($('<b>').text(msg),'<a target="_blank" href="'+ base64image + '"> <img src="'+base64image+'"/> </a>'
        )
        );
});

$(function(){
$("#imagefile").on('change',function(e){
var file = e.originalEvent.target.files[0];
var reader=new FileReader();
reader.onload=function(evt){
//enviar imagen resultante
socket.emit('user image',evt.target.result);
};
reader.readAsDataURL(file);
});
});


// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('ticket:current', function (data) {
    label.text(data.ticket);
});

$('button').on('click', function () {
    socket.emit('ticket:next', null, function (data) {
        label.text(data);
    });
});

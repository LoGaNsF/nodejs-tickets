var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';

    throw new Error('Es escritorio es necesario');
}

var label = $('small');
var desk = searchParams.get('escritorio');

$('h1').text('Escritorio ' + desk);

$('button').on('click', function () {
    socket.emit('ticket:attend', { desk: desk }, function (resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return false;
        }

        label.text('Ticket ' + resp.number);
    });
});
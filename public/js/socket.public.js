var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('ticket:current', function (data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    
    for (var i = 0; i < data.currentTickets.length; i++) {
        $('#lblTicket' + (i + 1)).text('Ticket ' + data.currentTickets[i].number);
        $('#lblEscritorio' + (i + 1)).text('Escritorio ' + data.currentTickets[i].desk);
    }
});

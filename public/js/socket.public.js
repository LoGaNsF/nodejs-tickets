var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('ticket:current:update', function(data) {
    updateHTML(data.currentTickets);
});

socket.on('ticket:current', function (data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    updateHTML(data.currentTickets);
});

function updateHTML(tickets) {
    for (var i = 0; i < tickets.length; i++) {
        $('#lblTicket' + (i + 1)).text('Ticket ' + tickets[i].number);
        $('#lblEscritorio' + (i + 1)).text('Escritorio ' + tickets[i].desk);
    }
}

const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl(); 

io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    client.on('ticket:next', (data, callback) => {
        let ticket = ticketControl.nextTicket();

        callback(ticket);
    });

    client.emit('ticket:current', {
        ticket: ticketControl.getLastTicket(),
        currentTickets: ticketControl.getCurrentTickets()
    });

    client.on('ticket:attend', (data, callback) => {
        if (!data.desk) {
            return callback({
                error: true,
                message: 'Es necesario indicar un escritorio.'
            });
        }

        let attendedTicket = ticketControl.attendTicket(data.desk);

        callback(attendedTicket);
    });
});

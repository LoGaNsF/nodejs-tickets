const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.tickets = [];
        this.lastTicket = 0;
        this.currentTickets = [];
        this.today = new Date().getDate();

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.tickets = data.tickets;
            this.lastTicket = data.lastTicket;
            this.currentTickets = data.currentTickets;
        } else {
            this.reset();
        }
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    getCurrentTickets() {
        return this.currentTickets;
    }

    attendTicket(desk) {
        if (!this.tickets.length) {
            return 'No hay tickets';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendedTicket = new Ticket(ticketNumber, desk);
        this.currentTickets.unshift(attendedTicket);

        if (this.currentTickets.length > 4) {
            this.currentTickets.splice(-1, 1);
        }

        this.writeFileData();

        return attendedTicket;
    }

    nextTicket() {
        this.lastTicket += 1;
        
        let ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.writeFileData();

        return `Ticket ${this.lastTicket}`;
    }

    reset() {
        this.tickets = [];
        this.lastTicket = 0;
        this.writeFileData();
    }

    writeFileData() {
        let newData = {
            today: this.today,
            tickets: this.tickets,
            lastTicket: this.lastTicket,
            currentTickets: this.currentTickets
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(newData));
    }
}

module.exports = {
    TicketControl
};
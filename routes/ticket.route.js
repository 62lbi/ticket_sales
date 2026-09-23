const express = require('express');
const app = express();
const ticketController = require('../controllers/ticket.controller');

const {authorize} = require('../controllers/auth.controller') //*added authorization on 21/08/2026 module 6
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation') //*added role validation on 21/08/2026

app.use(express.json());

// Verifikasi setiap handler berikut tidak undefined
app.post('/', authorize, isAdmin, ticketController.addTicket);
app.get('/', authorize, isAdmin, ticketController.getAllTicket);
app.get('/user/:userID', authorize, isAdmin, ticketController.getUserTickets);
app.get('/sales-per-event', authorize, isUser, ticketController.getTicketSalesPerEvent);
app.get('/top-active-events', authorize, isUser, ticketController.getTop5UpcomingEvents);
app.get('/:id', authorize, isAdmin, ticketController.ticketById);

module.exports = app;
const express = require('express');
const app = express();
const ticketController = require('../controllers/ticket.controller');

const {authorize} = require('../controllers/auth.controller') //*added authorization on 21/08/2026 module 6
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation') //*added role validation on 21/08/2026

app.use(express.json());

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: create new ticket(s), creating a new seat for each requested seat and booking it - Admin Access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventID:
 *                 type: integer
 *                 example: 1
 *               userID:
 *                 type: integer
 *                 example: 5
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     rowNum:
 *                       type: string
 *                       example: A
 *                     seatNum:
 *                       type: integer
 *                       example: 12
 *     responses:
 *       201:
 *         description: New ticket has been created.
 *       500:
 *         description: Server error while creating ticket.
 */
app.post('/', authorize, isAdmin, ticketController.addTicket);

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: get all tickets, including associated event, user, and seat data - Admin Access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tickets have been loaded.
 *       500:
 *         description: Server error while retrieving tickets.
 */
app.get('/', authorize, isAdmin, ticketController.getAllTicket);

/**
 * @swagger
 * /ticket/user/{userID}:
 *   get:
 *     summary: get all tickets belonging to a specific user - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose tickets are being retrieved
 *     responses:
 *       200:
 *         description: Tickets for the specified user loaded successfully.
 *       500:
 *         description: Server error while retrieving user's tickets.
 */
app.get('/user/:userID', authorize, isAdmin, ticketController.getUserTickets);

/**
 * @swagger
 * /ticket/sales-per-event:
 *   get:
 *     summary: get the total number of tickets sold, grouped per event - User & Admin Access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket sales count per event retrieved successfully.
 *       500:
 *         description: Server error while retrieving ticket sales.
 */
app.get('/sales-per-event', authorize, isUser, ticketController.getTicketSalesPerEvent);

/**
 * @swagger
 * /ticket/top-active-events:
 *   get:
 *     summary: get the top 5 upcoming/active events ranked by ticket sales - User & Admin Access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top 5 active events loaded successfully.
 *       500:
 *         description: Server error while retrieving top events.
 */
app.get('/top-active-events', authorize, isUser, ticketController.getTop5UpcomingEvents);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: get a specific ticket by its ID, including associated event, user, and seat data - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket to retrieve
 *     responses:
 *       200:
 *         description: Ticket loaded successfully.
 *       500:
 *         description: Server error while retrieving ticket.
 */
app.get('/:id', authorize, isAdmin, ticketController.ticketById);

module.exports = app;
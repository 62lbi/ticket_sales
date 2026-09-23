//load library from express
const express = require('express')

//initiate the express with the instance of app
const app = express()

//allow to read 'request' with json file type 
app.use(express.json())

//load seat's controller
const seatController = require('../controllers/seat.controller')
const {authorize} = require('../controllers/auth.controller') //*added authorization on 21/08/2026 module 6
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation') //*added role validation on 21/08/2026

//route method GET to find all seats
/**
 * @swagger
 * /seat:
 *   get:
 *     summary: get all of the existing seats in the database, including associated event data - Admin Access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Seats have been loaded.
 *       500:
 *         description: Server error while retrieving seats.
 */
app.get('/', authorize, isAdmin,  seatController.getAllSeat)

//route method GET + id to find a specific seat
/**
 * @swagger
 * /seat/{key}:
 *   get:
 *     summary: search seats by row number, seat ID, event ID, seat number, or status - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for (row number as text, numeric ID, or "true"/"false"/"1"/"0" for status)
 *     responses:
 *       200:
 *         description: Filtered seats retrieved successfully.
 *       500:
 *         description: Server error while searching seats.
 */
app.get('/:key', authorize, isAdmin, seatController.findSeat)

//route method POST to add a new seat value in table
/**
 * @swagger
 * /seat:
 *   post:
 *     summary: add a new seat data - Admin Access
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
 *               rowNum:
 *                 type: string
 *                 example: A
 *               seatNum:
 *                 type: integer
 *                 example: 12
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: New seat has been added.
 *       500:
 *         description: Server error while adding seat.
 */
app.post('/', authorize, isAdmin, seatController.addSeat)

//route method PUT to update existing data that exists in table
/**
 * @swagger
 * /seat/{id}:
 *   put:
 *     summary: Update existing seat data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seat to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventID:
 *                 type: integer
 *                 example: 1
 *               rowNum:
 *                 type: string
 *                 example: A
 *               seatNum:
 *                 type: integer
 *                 example: 12
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Seat data updated successfully.
 *       404:
 *         description: Seat not found or no changes made.
 *       500:
 *         description: Server error while updating seat.
 */
app.put('/:id', authorize, isAdmin, seatController.updateSeat)

//route method DELETE to delete the existing table
/**
 * @swagger
 * /seat/{id}:
 *   delete:
 *     summary: delete a specific seat data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seat to delete
 *     responses:
 *       200:
 *         description: Seat data has been deleted.
 *       404:
 *         description: Seat not found.
 *       500:
 *         description: Server error while deleting seat.
 */
app.delete('/:id', authorize, isAdmin, seatController.deleteSeat)

//export app in order to load in another file 
module.exports = app
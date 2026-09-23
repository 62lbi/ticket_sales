//load library express
const express = require(`express`)

//initiate object that instance of express
const app = express()

//allow to read 'request' with json type
app.use(express.json())

//load event's controller
const eventController = require('../controllers/event.controller')
const { authorize } = require('../controllers/auth.controller')
const { isUser, isAdmin, isBoth } = require('../middlewares/role-validation')

//create route to get data with method "GET"
/**
 * @swagger
 * /event:
 *   get:
 *     summary: get all of the existing event in the database - User & Admin Access
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Events have been loaded.
 */
app.get("/", authorize, isBoth, eventController.getAllEvent)

/**create route to find */
//using method "GET" and define parameter "key" for keyword
/**
 * @swagger
 * /event/{key}:
 *   get:
 *     summary: get a specified event data based on keyword - User & Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for in the event name
 *     responses:
 *       200:
 *         description: All events have been loaded.
 */
app.get("/:key", authorize, isBoth, eventController.findEvent)

//create route to add a new user with method "POST"
/**
 * @swagger
 * /event:
 *   post:
 *     summary: add a new event data - Admin Access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: SMK Telkom Malang Dies Natalis Ke-41
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *               venue:
 *                 type: string
 *                 example: SMK Telkom Malang
 *               price:
 *                 type: number
 *                 example: 45000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: New event has been inserted.
 */
app.post("/", authorize, isAdmin, eventController.addEvent)

/** create route to update event */
//using method "PUT" and define parameter for "id"
/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update existing event data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: SMK Telkom Malang Dies Natalis Ke-41
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *               venue:
 *                 type: string
 *                 example: SMK Telkom Malang
 *               price:
 *                 type: number
 *                 example: 45000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data event has been updated.
 */
app.put("/:id", authorize, isAdmin, eventController.updateEvent)

/** create route to delete event */
//using method "DELETE" and define parameter for "id"
/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: delete a specific event data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event to delete
 *     responses:
 *       200:
 *         description: event has been deleted.
 */
app.delete("/:id", authorize, isAdmin, eventController.deleteEvent)

module.exports = app

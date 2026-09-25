/** load library from express */
const express = require('express')

/**initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/**load function authentication from auth's controller */
const {authenticate} = require('../controllers/auth.controller')

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: first step to access the API, requires the user to login as admin or user.
 *     tags: [authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Authentication Success.
 *       400:
 *         description: "Authentication Failed: Invalid username or password."
 */
app.post('/', authenticate)

/**export app in order to load in another file */
module.exports = app
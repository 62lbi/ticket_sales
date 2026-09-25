/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load user's controller */
const userController = require(`../controllers/user.controller`)
const {midOne} = require('../middlewares/simple-middleware')
const {authorize} = require('../controllers/auth.controller')
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation')
const {validateUser} = require('../middlewares/user-validation')

/** create route to get data with method "GET" */
/**
 * @swagger
 * /user:
 *   get:
 *     summary: get all users - Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users have been loaded.
 */
app.get("/", authorize, isAdmin, userController.getAllUser)

/** create route to find user
 *using method "GET" and define parameter "key" for keyword */
/**
 * @swagger
 * /user/{key}:
 *   get:
 *     summary: get a specified user based on keyword - User & Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for in user data
 *     responses:
 *       200:
 *         description: Matching users have been loaded.
 */
app.get("/:key", authorize, isBoth,  userController.findUser)

/** create route to add new user using method "POST" */
/**
 * @swagger
 * /user:
 *   post:
 *     summary: add a new user - Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *             # TODO: fill in real fields from userController.addUser / validateUser
 *     responses:
 *       200:
 *         description: New user has been created.
 */
app.post("/", authorize, isAdmin, validateUser, userController.addUser)

/** create route to update user 
 * using method "PUT" and define parameter for "id" */
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update existing user data with its ID - Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *             # TODO: fill in real fields from userController.updateUser
 *     responses:
 *       200:
 *         description: User data has been updated.
 */
app.put("/:id", authorize, isAdmin, userController.updateUser)

/** create route to reset user password
 * using method "PUT" and define parameter for "id" */
/**
 * @swagger
 * /user/{id}/reset:
 *   put:
 *     summary: reset a user's password - Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose password will be reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *             # TODO: fill in real fields from userController.resetUserPassword
 *     responses:
 *       200:
 *         description: Password has been reset.
 */
app.put("/:id/reset", authorize, isAdmin,  userController.resetUserPassword)

/** create route to delete user 
 * using method "DELETE" and define parameter for "id" */
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: delete a specific user with its ID - Admin Access
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User has been deleted.
 */
app.delete("/:id", authorize, isAdmin, userController.deleteUser)

module.exports = app
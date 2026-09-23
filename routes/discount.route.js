/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load user's controller */
const discountController = require(`../controllers/discount.controller`)
const {authorize} = require('../controllers/auth.controller')
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation')

/** create route to get data with method "GET" */
/**
 * @swagger
 * /discount:
 *   get:
 *     summary: get all of the existing discounts in the database - User & Admin Access
*     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All discounts have been loaded.
 */
app.get("/", authorize, isBoth, discountController.getAllDiscount)

/** create route to find discount
 *using method "GET" and define parameter "key" for keyword */
/**
 * @swagger
 * /discount/{key}:
 *   get:
 *     summary: get a specified discount data based on keyword - User & Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for in the discount name
 *     responses:
 *       200:
 *         description: All matching discounts have been loaded.
 */
app.get("/:key", authorize, isBoth, discountController.findDiscount)

/** create route to add new discount using method "POST" */
/**
 * @swagger
 * /discount:
 *   post:
 *     summary: add a new discount data - Admin Access
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountName:
 *                 type: string
 *                 example: Diskon ramen 15%
 *               amount:
 *                 type: number
 *                 example: 32000
 *               expiredDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *     responses:
 *       200:
 *         description: New discount has been inserted.
 *       400:
 *         description: Failed to insert new discount, invalid or missing data.
 */
app.post("/", authorize, isAdmin, discountController.addDiscount)

/** create route to update discount 
 * using method "PUT" and define parameter for "id" */
/**
 * @swagger
 * /discount/{id}:
 *   put:
 *     summary: Update existing discount data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the discount to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountName:
 *                 type: string
 *                 example: Diskon ramen 15%
 *               amount:
 *                 type: number
 *                 example: 32000
 *               expiredDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *     responses:
 *       200:
 *         description: Discount has been updated.
 *       400:
 *         description: Failed to update discount, invalid or missing data.
 */
app.put("/:id", authorize, isAdmin, discountController.updateDiscount)

/** create route to delete discount 
 * using method "DELETE" and define parameter for "id" */
/**
 * @swagger
 * /discount/{id}:
 *   delete:
 *     summary: delete a specific discount data with its ID - Admin Access
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the discount to delete
 *     responses:
 *       200:
 *         description: Discount has been deleted.
 *       400:
 *         description: Failed to delete discount.
 */
app.delete("/:id", authorize, isAdmin, discountController.deleteDiscount)

/** export app in order to load in another file */
module.exports = app
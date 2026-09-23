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
app.get("/", authorize, isBoth, discountController.getAllDiscount)

/** create route to find discount
 *using method "GET" and define parameter "key" for keyword */
app.get("/:key", authorize, isBoth, discountController.findDiscount)

/** create route to add new discount using method "POST" */
app.post("/", authorize, isAdmin, discountController.addDiscount)

/** create route to update discount 
 * using method "PUT" and define parameter for "id" */
app.put("/:id", authorize, isAdmin, discountController.updateDiscount)

/** create route to delete discount 
 * using method "DELETE" and define parameter for "id" */
app.delete("/:id", authorize, isAdmin, discountController.deleteDiscount)

/** export app in order to load in another file */
module.exports = app
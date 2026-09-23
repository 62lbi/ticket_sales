//load library express
const express = require(`express`)

//initiate object that instance of express
const app = express()

//allow to read 'request' with json type
app.use(express.json())

//load event's controller
const eventController = require('../controllers/event.controller')
const {authorize} = require('../controllers/auth.controller')
const {isUser, isAdmin, isBoth} = require ('../middlewares/role-validation')

//create route to get data with method "GET"
app.get("/", authorize, isBoth, eventController.getAllEvent)

/**create route to find */
//using method "GET" and define parameter "key" for keyword
app.get("/:key", authorize, isBoth, eventController.findEvent)

//create route to add a new user with method "POST"
app.post("/", authorize, isAdmin, eventController.addEvent)

/** create route to update event */
//using method "PUT" and define parameter for "id"
app.put("/:id", authorize, isAdmin, eventController.updateEvent)

/** create route to delete event */
//using method "DELETE" and define parameter for "id"
app.delete("/:id", authorize, isAdmin, eventController.deleteEvent)

module.exports = app 




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
app.get('/', authorize, isAdmin,  seatController.getAllSeat)

//route method GET + id to find a specific seat
app.get('/:key', authorize, isAdmin, seatController.findSeat)

//route method POST to add a new seat value in table
app.post('/', authorize, isAdmin, seatController.addSeat)

//route method PUT to update existing data that exists in table
app.put('/:id', authorize, isAdmin, seatController.updateSeat)

//route method DELETE to delete the existing table
app.delete('/:id', authorize, isAdmin, seatController.deleteSeat)

//export app in order to load in another file 
module.exports = app
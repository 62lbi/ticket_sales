/** load library express */
const express = require(`express`)

/** create object that instances of express */
const app = express()

/** define port of server */
const PORT = 8000

/** load library cors */
const cors = require(`cors`)

/** open CORS policy */
app.use(cors())

/** load swagger */
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

/** define all routes */
const userRoute = require(`./routes/user.route`)
const discountRoute = require('./routes/discount.route')
const eventRoute = require('./routes/event.route')
const ticketRoute = require('./routes/ticket.route')
const seatRoute = require('./routes/seat.route')
const auth = require('./routes/auth.route')

/** define prefix for each route */
app.use(`/user`, userRoute)
app.use('/discount', discountRoute)
app.use('/event', eventRoute)
app.use('/ticket', ticketRoute)
app.use('/seat', seatRoute)
app.use('/auth', auth)

/** route for swagger documentation page */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/** route to access uploaded file */
app.use(express.static(__dirname))

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`come out and haunt me ${PORT}`)
})
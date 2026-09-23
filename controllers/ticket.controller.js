// load models
const models = require('../models/index');
const seatModel = models.seat;
const userModel = models.user;
const eventModel = models.event;
const ticketModel = models.ticket;
const sequelize = models.sequelize; 

// load Op
const Op = require('sequelize').Op;

// 1. CREATE TICKET
exports.addTicket = async (request, response) => {
    const today = new Date();
    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const { eventID, userID, seats } = request.body;

    try {
        const seatIDs = await Promise.all(
            seats.map(async seat => {
                const { rowNum, seatNum } = seat;

                const createdSeat = await seatModel.create({
                    eventID,
                    rowNum,
                    seatNum,
                    status: true 
                });
                return createdSeat.seatID;
            })
        );

        const tickets = await ticketModel.bulkCreate(
            seatIDs.map(seatID => ({
                eventID,
                userID,
                seatID,
                bookedDate
            }))
        );

        return response.status(201).json({
            success: true,
            data: tickets,
            message: 'New ticket has been created'
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 2. GET ALL TICKETS
exports.getAllTicket = async (request, response) => {
    try {
        let tickets = await ticketModel.findAll({
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
                { model: userModel, attributes: ['firstname', 'lastname'] },
                { model: seatModel, attributes: ['rowNum', 'seatNum'] }
            ]
        });

        return response.json({
            success: true,
            data: tickets,
            message: 'All tickets have been loaded'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 3. GET TICKET BY ID
exports.ticketById = async (request, response) => {
    try {
        let ticketID = request.params.id;

        let tickets = await ticketModel.findAll({
            where: { ticketID: ticketID },
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
                { model: userModel, attributes: ['firstname', 'lastname', 'email'] },
                { model: seatModel, attributes: ['rowNum', 'seatNum'] }
            ]
        });

        return response.json({
            success: true,
            data: tickets,
            message: 'Ticket loaded successfully'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}; // <-- This closing brace was missing!

// 4. GET TICKETS FOR SPECIFIC USER
exports.getUserTickets = async (request, response) => {
    try {
        const userID = request.params.userID; 

        const tickets = await ticketModel.findAll({
            where: { userID: userID },
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue', 'price'] },
                { model: seatModel, attributes: ['rowNum', 'seatNum'] }
            ]
        });

        return response.json({
            success: true,
            data: tickets,
            message: `Tickets for user ID ${userID} loaded successfully`
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 5. GET TICKET SALES COUNT PER EVENT
exports.getTicketSalesPerEvent = async (request, response) => {
    try {
        const sales = await ticketModel.findAll({
            attributes: [
                'eventID',
                [sequelize.fn('COUNT', sequelize.col('ticket.ticketID')), 'totalTicketsSold']
            ],
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] }
            ],
            group: ['ticket.eventID', 'event.eventID']
        });

        return response.json({
            success: true,
            data: sales,
            message: 'Ticket sales count per event retrieved successfully'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 6. GET TOP 5 UPCOMING / ACTIVE EVENTS BY SALES
exports.getTop5UpcomingEvents = async (request, response) => {
    try {
        const now = new Date();

        const topEvents = await ticketModel.findAll({
            attributes: [
                'eventID',
                [sequelize.fn('COUNT', sequelize.col('ticket.ticketID')), 'totalTicketsSold']
            ],
            include: [
                {
                    model: eventModel,
                    attributes: ['eventName', 'eventDate', 'venue', 'price'],
                    where: {
                        eventDate: {
                            [Op.gte]: now
                        }
                    }
                }
            ],
            group: ['ticket.eventID', 'event.eventID'],
            order: [[sequelize.literal('totalTicketsSold'), 'DESC']],
            limit: 5
        });

        return response.json({
            success: true,
            data: topEvents,
            message: 'Top 5 active events loaded successfully'
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};
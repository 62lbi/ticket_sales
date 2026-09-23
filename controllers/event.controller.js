/** load model for 'events' table */
const eventModel = require('../models/index').event

/**load Operation from Sequelize */
const Op = require('sequelize').Op

/**load library 'path' and 'filestream' */
const path = require('path')
const fs = require('fs')

/**create function for read all data -----------------------------------------------------------------------------------------*/
exports.getAllEvent = async (request, response) => {
    /**call to findAll() to get all data... with GET Method i think? */
    let events = await eventModel.findAll()
    return response.json({
        success: true,
        data: events,
        message: 'All Events have been loaded'
    })
}
/**create function for filter----------------------------------------------------------------------------------------------------*/
exports.findEvent = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.params.key

    /**call findAll() within where clause and operation
     * to find data based on keyword */
    let events = await eventModel.findAll({ //is this supposed to be findAll? or does it have to be findEvent? im just following what my teacher tells me
        where: {
            [Op.or]: [
                { eventName: { [Op.substring]: keyword } },
                { eventDate: { [Op.substring]: keyword } },
                { venue: { [Op.substring]: keyword } },
                { price: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: events,
        message: 'All Events have been loaded'
    })
}
// load function from 'upload-image'
// single('image') means just upload one file
// with request name 'image'

const upload = require(`./upload.image`).single(`image`)

//* create function to addEvent--------------------------------------------------------------------------------------------------
exports.addEvent = (request, response) => {
    //* 1. run function upload
    upload(request, response, async error => {
        //*2. check if theres any error when uploading */
        if (error) {
            return response.json({ message: error })
        }
        //* 3. check if  file is empty
        if (!request.file) {
            return response.json({ message: `Nothing to Upload` })
        }
        /* 4. prepare data from request */
        let newEvent = {
            eventName: request.body.eventName,
            eventDate: request.body.eventDate,
            venue: request.body.venue,
            price: request.body.price,
            image: request.file.filename
        }
        /* 5. execute inserting data to the event's table*/
        eventModel.create(newEvent)
            .then(result => {
                /* 5a. if insert's process success*/
                return response.json({
                    success: true,
                    data: result,
                    message: `New event has been inserted`
                })
            })
            /* 5b. if insert's process fail */
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}
// add function to update event ------------------------------------------------------------------------------------
exports.updateEvent = async (request, response) => {

    // run upload function
    upload(request, response, async error => {

        // check if theres any error when upload
        if (error) {
            return response.json({
                success: false,
                message: error
            })
        }

        // store selected event ID
        let eventID = request.params.id

        // prepare event data
        let dataEvent = {
            eventName: request.body.eventName,
            eventDate: request.body.eventDate,
            venue: request.body.venue,
            price: request.body.price
        }


        // if user uploads new image
        if (request.file) {

            // get selected event data
            let selectedEvent = await eventModel.findOne({
                where: {
                    eventID: eventID
                }
            })

            // get old image filename
            const oldImage = selectedEvent.image

            // prepare old image path
            const pathImage = path.join(
                __dirname,
                `../image`,
                oldImage
            )

            // check if old image exists
            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, error => console.log(error))
            }

            // replace image with new image
            dataEvent.image = request.file.filename
        }


        // update event data
        eventModel.update(dataEvent, {
            where: {
                eventID: eventID
            }
        })
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `Data event has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })

    })
}
//create function to delete event ----------------------------------------------------------------------------------
exports.deleteEvent = async (request, response) => {
    //store the specified/selected events ID that will be delete
    const eventID = request.params.id //maybe this too.. is this supposed to be request.params.eventID?

    //delete image file
    //get selected event's data
    const event = await eventModel.findOne({ where: { eventID: eventID } })
    //get old file name of image file
    const oldImage = event.image

    //prepare path of old image to delete file
    const pathImage = path.join(__dirname, `../image`, oldImage)

    //check file existence
    if (fs.existsSync(pathImage)) {
        //delete old image file
        fs.unlink(pathImage, error => console.log(error))
    }
    //end of delete image file

    //execute delete data based on the defined id event
    eventModel.destroy({ where: { eventID: eventID } })
        .then(result => {
            //if update status is success
            return response.json({
                success: true,
                data: result,
                message: `Data event has been deleted`
            })
                //if update status failed
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
}
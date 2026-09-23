// load models
const seatModel = require('../models/index').seat;
const eventModel = require('../models/index').event;

// load Op 
const { Op } = require('sequelize');

// 1. GET ALL SEATS
exports.getAllSeat = async (request, response) => {
  try {
    let seats = await seatModel.findAll({
      include: [{ model: eventModel }] // Optional: includes associated Event data
    });
    return response.json({
      success: true,
      data: seats,
      message: 'All Seats have been loaded'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 2. FIND / SEARCH SEATS
exports.findSeat = async (request, response) => {
  try {
    let keyword = request.params.key;

    // Build conditional OR search criteria based on data types
    let searchConditions = [
      { rowNum: { [Op.substring]: keyword } } // STRING field works with substring
    ];

    // If the keyword is a valid number, include integer fields in the search
    if (!isNaN(keyword)) {
      const numericVal = parseInt(keyword, 10);
      searchConditions.push(
        { seatID: { [Op.eq]: numericVal } },
        { eventID: { [Op.eq]: numericVal } },
        { seatNum: { [Op.eq]: numericVal } }
      );
    }

    // Check for boolean status search (e.g., 'true' / 'false' or '1' / '0')
    if (keyword.toLowerCase() === 'true' || keyword === '1') {
      searchConditions.push({ status: true });
    } else if (keyword.toLowerCase() === 'false' || keyword === '0') {
      searchConditions.push({ status: false });
    }

    let seats = await seatModel.findAll({
      where: {
        [Op.or]: searchConditions
      }
    });

    return response.json({
      success: true,
      data: seats,
      message: 'Filtered seats retrieved successfully'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. ADD SEAT
exports.addSeat = async (request, response) => {
  try {
    let newSeat = {
      eventID: request.body.eventID,
      rowNum: request.body.rowNum,
      seatNum: request.body.seatNum,
      status: request.body.status
    };

    let result = await seatModel.create(newSeat);
    return response.json({
      success: true,
      data: result,
      message: 'New seat has been added'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 4. UPDATE SEAT
exports.updateSeat = async (request, response) => {
  try {
    let seatID = request.params.id;

    // Build update object dynamically to only include values provided in request.body
    let dataSeat = {};
    if (request.body.eventID !== undefined) dataSeat.eventID = request.body.eventID;
    if (request.body.rowNum !== undefined) dataSeat.rowNum = request.body.rowNum;
    if (request.body.seatNum !== undefined) dataSeat.seatNum = request.body.seatNum;
    if (request.body.status !== undefined) dataSeat.status = request.body.status;

    let result = await seatModel.update(dataSeat, { where: { seatID: seatID } });

    if (result[0] === 0) {
      return response.status(404).json({
        success: false,
        message: 'Seat not found or no changes made'
      });
    }

    return response.json({
      success: true,
      message: 'Seat data updated successfully'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 5. DELETE SEAT
exports.deleteSeat = async (request, response) => {
  try {
    let seatID = request.params.id;

    let result = await seatModel.destroy({ where: { seatID: seatID } });

    if (!result) {
      return response.status(404).json({
        success: false,
        message: 'Seat not found'
      });
    }

    return response.json({
      success: true,
      message: 'Seat data has been deleted'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message
    });
  }
};
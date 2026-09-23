/** load model for `discounts` table */
const discountModel = require("../models").discount

/** load Operation from Sequelize */
const Op = require("sequelize").Op

/** create function for filter */
exports.findDiscount = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.params.key

    /** call findAll() within where clause and operation
     * to find data based on keyword
     */
    let discounts = await discountModel.findAll({
        where: {
            discountName: {
                [Op.substring]: keyword
            }
        }
    })

    return response.json({
        success: true,
        data: discounts,
        message: "All discounts have been loaded"
    })
}

/** create function for add new discount */
exports.addDiscount = (request, response) => {
    /** prepare data from request */
    let newDiscount = {
        discountName: request.body.discountName,
        amount: request.body.amount,
        expiredDate: request.body.expiredDate
    }

    /** execute inserting data to discount's table */
    discountModel.create(newDiscount)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: "New discount has been inserted"
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for update discount */
exports.updateDiscount = (request, response) => {
    /** prepare data that has been changed */
    let dataDiscount = {
        discountName: request.body.discountName,
        amount: request.body.amount,
        expiredDate: request.body.expiredDate
    }

    /** define id discount that will be updated */
    let discountID = request.params.id

    /** execute update data based on defined id discount */
    discountModel.update(dataDiscount, {
        where: { discountID: discountID }
    })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: "Data discount has been updated"
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for delete discount */
exports.deleteDiscount = (request, response) => {
    /** define id discount that will be deleted */
    let discountID = request.params.id

    /** execute delete data based on defined id discount */
    discountModel.destroy({
        where: { discountID: discountID }
    })
        .then(result => {
            /** if delete's process success */
            return response.json({
                success: true,
                message: "Data discount has been deleted"
            })
        })
        .catch(error => {
            /** if delete's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for get all discount */
exports.getAllDiscount = async (request, response) => {
    try {
        const discounts = await discountModel.findAll()

        return response.json({
            success: true,
            data: discounts,
            message: "All discounts have been loaded"
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}
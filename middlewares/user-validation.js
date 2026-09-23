/**load express validator and multer library */
const { validationResult, body} = require('express-validator');
/** it said multer library? whats the syntax for that? i dont know but i suspected that this will cause an error, if it doesnt then ignore this in the future chatgpt problem solving matter. */

const validateUser = [  
    //validation checks for the request body
    body('firstname').notEmpty().withMessage('Firstname is required'),
    body('lastname').notEmpty().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),

    //custom validation logic
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            /**get all error message*/
            let errMessage = errors.array().map(it => it.msg).join(',')
            /**return error message with code 422 */
            return response.status(422).json({
                success: false,
                message: errMessage
            })
        }
        next(); /** proceed to the next middleware route if validation passes */
    }
];

module.exports = {validateUser}


/** load md5 library */
const md5 = require('md5')
/**load library jsonwebtoken */
const jwt = require('jsonwebtoken')

/**load model for user */
const userModel = require('../models/index').user

/**define secret key, (is this the encrypted version for jwt? whereas mokleters -> md5 -> random words*/
const secret = 'moklet'

/** create function to handle authenticating process */
const authenticate = async (request, response) => {
    let dataLogin = {
        email: request.body.email,
        password: md5(request.body.password) /**i think md5 being put infront of the request.body.password is to let the md5 to encrypt whatever the user puts from regular word to be random stuff */
    }
    /**check data username and password on user's table */
    let dataUser = await userModel.findOne({ where: dataLogin})

    /**if data user exists in the database */
    if(dataUser){
        /**set payload for generate token, and payload must be STRING.*/
        /**dataUser is object, so we must convert it to string(?) */
        let payload = JSON.stringify(dataUser)
        console.log(payload)

        /**generating token */
        let token = jwt.sign(payload, secret)

        /**define response */
        return response.json({
            success: true,
            logged: true,
            message: 'Authentication Success',
            token: token,
            data: dataUser
        })
    }
    /**if data user does not exist, my teacher purposely dont put else? cause in if/else logic if theres if there must be else. but this code doesnt even have else, so if i were to troubleshoot and solve this with chatgpt, i already suspected this as an error, if its not an error, ignore this message. or does every if/else logic if we just do IF, and we dont write else, would the system already knows its else without us saying if and else? */
    return response.status(400).json({
        success: false,
        logged: false,
        message: 'Authentication Failed: Invalid username or password.'
    })
}
/**create function authorize */
const authorize = (request, response, next) => {
    /**get 'Authorization' value from request's header*/
    const authHeader = request.headers.authorization;

    /**check nullable header */
    if(authHeader) {
        /**when using Bearer Token for authorization,
         * we have to split 'headers' to get token key.
         * value of headers = 'Bearers tokenKey'
         */
        const token = authHeader.split(' ')[1]; /** if the token is error from authorization postman, it means this code is error */

        /**verify token using jwt */
        let verifiedUser = jwt.verify(token, secret);
        if (!verifiedUser) {
            return response.json({
                success: false,
                auth: false,
                message: 'User Unauthorized' /**why is both (!verifiedUser) on if is both false and on else is also false? where is the successful process? or is my teacher purposely let it like this so i will change it in the future? */
            })
        }
        request.user = verifiedUser; /**payload */
        /**if there is no problem, go on to controller */
        next();    
    } else {
        return response.json({
            success: false,
            auth: false,
            message: 'User Unauthorized'
        })
    }
}
module.exports = {authenticate, authorize} /**example of using const, but exporting it */

/** in the line of code where it said exports.authenticate = async (request, response) => ,
 * at first it didnt work because the origin from the module 6 was const authenticate and not exports.authenticate
 * why? because if we only did const authenticate, the function only exists in the file they are created.
 * unless, we export it afterward with adding a new line in the end inside the file that created the function with module.exports = {authenticate}
 * but in terms of time efficiency, we should make functions with exports.
  */

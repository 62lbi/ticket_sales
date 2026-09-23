/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load user's controller */
const userController = require(`../controllers/user.controller`)
const {midOne} = require('../middlewares/simple-middleware') /**added simple middleware for getAllUser 20/08/2026, this isnt used anymore due to getting further in the module 6.. i have made a true middleware function than a simple testing **/
const {authorize} = require('../controllers/auth.controller') //*added authorization on 21/08/2026 module 6
const {isUser, isAdmin, isBoth} = require('../middlewares/role-validation') //*added role validation on 21/08/2026

/**load function from user-validation */
const {validateUser} = require('../middlewares/user-validation') /**added user-validation 20/08/2026 */

/** create route to get data with method "GET" */
app.get("/", authorize, isAdmin, userController.getAllUser) /** also added [midOne] on getAllUser, if i remove it then no middleware for getalluser 20/08/2026*/ 

/** create route to find user
 *using method "GET" and define parameter "key" for keyword */
app.get("/:key", authorize, isBoth,  userController.findUser)

/** create route to add new user using method "POST" */
app.post("/", authorize, isAdmin, validateUser, userController.addUser)

/** create route to update user 
 * using method "PUT" and define parameter for "id" */
app.put("/:id", authorize, isAdmin, userController.updateUser)

/** create route to reset user password
 * using method "PUT" and define parameter for "id" */
app.put("/:id/reset", authorize, isAdmin,  userController.resetUserPassword)

/** create route to delete user 
 * using method "DELETE" and define parameter for "id" */
app.delete("/:id", authorize, isAdmin, userController.deleteUser) //tried to add isSuperadmin to prevent admin deleting itself, but it didnt work, error output was; truncate error role 'admin'. but then when i tried to analyze it further, my ways of adding up the superadmin role was straight to the migrations.. and then thats when i realized i only changed the migrations inside the vscode (not updated in the database). im guessing that i have to do npx sequelize-cli db:migrate? so that the added role in the migrations in the vscode file would be updated and thus the database is also updated.

/** export app in order to load in another file */
module.exports = app

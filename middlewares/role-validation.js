const isUser = async (request, response, next) => {
    console.log(request.user.role)
    if (request.user.role == "user") {
        next();
    } else {
        return response.status(401).json({
            success: false,
            auth: false,
            message: 'Forbidden! you are not User.'
        })
    }
}

const isAdmin = async (request, response, next) => {
    console.log(request.user.role) /** in my teachers module, this line of code doesnt exists, so its just straight to if(request.user.role == "admin"). the reason i put console.log(request.user.role) is because the function below it wouldnt work if we wouldnt know what the user inputted. */
    if (request.user.role == "admin") {
        next();
    } else {
        return response.status (401).json({
            success: false,
            auth: false,
            message: 'Forbidden! you are not Admin.'
        })
    }
}

const isBoth = async (request, response, next) => {
    console.log(request.user.role)
    if (request.user.role == 'user' || request.user.role == 'admin' || request.user.role == 'superadmin') {
        next();
    } else {
        return response.status (401).json({
            success: false,
            auth: false
        })
    }
}

const isSuperadmin = async (request, response, next) => { 
    console.log(request.user.role)
    if (request.user.role == 'superadmin') { //added superadmin role on 17/09/2026 (note: if i want this function to work, i have to make superadmin role available in the migration first. right now the database only has user and admin recorded.)
        next();
    } else {
        return response.status (401).json({
            success: false,
            auth: false,
            message: 'Forbidden! you are not Superadmin.'
        })
    }
}

module.exports = {isUser, isAdmin, isBoth, isSuperadmin}
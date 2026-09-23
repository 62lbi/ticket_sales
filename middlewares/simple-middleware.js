/**creating first simple middleware */
const midOne = async (request, response, next) => {
    console.log('Run Middleware One')
    next() /**the functionality of this next(), is to let controller continue its process as it should*/
}
/** export function (this file function) to another file */
module.exports = {
    midOne
}
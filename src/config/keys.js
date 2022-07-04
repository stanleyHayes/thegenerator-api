const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    nodeENV: process.env.NODE_ENV,
    mongoDBURI: process.env.MONGODB_URI
}
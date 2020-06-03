const mongoose = require('mongoose')
module.exports = {
    port: 8080,
    DBConnection: (dbName) => { mongoose.connect(`mongodb://localhost:27017/${dbName}`) },
    secret: 'mysercret',
    corsOptions: {
        origin: 'http://localhost:4200'
    }
}
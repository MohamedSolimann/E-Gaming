const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var tempCartSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    product_ids: {
        type: Array
    }
});

//Export the model
module.exports = mongoose.model('tempCart', tempCartSchema);
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartShcema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    product_ids: {
        type: Array
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    }


});

//Export the model
module.exports = mongoose.model('Cart', cartShcema);
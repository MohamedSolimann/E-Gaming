const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productShcema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('Products', productShcema);
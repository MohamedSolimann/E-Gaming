const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    category_name: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('Categories', categorySchema);
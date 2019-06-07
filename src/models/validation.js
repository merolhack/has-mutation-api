// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ValidationSchema = new Schema({
    type: {type: String, required: true, max: 100}
});

// Export the model
module.exports = mongoose.model('Validation', ValidationSchema);

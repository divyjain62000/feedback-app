const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User schema
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    public: { type: Boolean, default: true }
});

feedbackSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Feedback', feedbackSchema);
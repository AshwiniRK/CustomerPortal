const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    user_id: String,
    order_id: String,
    filename: String,
    path: String,
    uploaded_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Artwork', ArtworkSchema);
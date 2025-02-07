const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  user_id: String,
  status: String,
  file_path: String,
  payment_method: String,
  paid_amount: Number,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
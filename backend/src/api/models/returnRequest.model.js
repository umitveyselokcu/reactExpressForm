const mongoose = require('mongoose');

/**
 * ReturnRequest Schema
 * @private
 */
const returnRequestSchema = new mongoose.Schema({
  partSerialNumber: {
    type: String,
    index: true,
    trim: true,
  },
  invoiceNumber: {
    type: String,
    trim: true,
  },
  comments: {
    type: String,
    index: true,
    trim: true,
  },
  reasonOfReturn: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
 returnRequestSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'partSerialNumber', 'invoiceNumber', 'comments', 'reasonOfReturn', 'timestamps'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
})

/**
 * @typedef ReturnRequest
 */
module.exports = mongoose.model('ReturnRequest', returnRequestSchema);

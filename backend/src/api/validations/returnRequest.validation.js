const Joi = require('joi');

module.exports = {
  // POST /v1/returnRequest
  createReturnRequest: {
    body: {
      partSerialNumber: Joi.string().alphanum().min(6).max(10).required(),
      invoiceNumber: Joi.string().alphanum().max(6),
      reasonOfReturn: Joi.string().required(),
      comments: Joi.string().max(240),      
    },
  },
};

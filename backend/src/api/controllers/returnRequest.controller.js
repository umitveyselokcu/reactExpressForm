const httpStatus = require('http-status');
const { omit } = require('lodash');
const ReturnRequest = require('../models/returnRequest.model');

/**
 * Create new returnRequest
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const returnRequests = new ReturnRequest(req.body);
    const savedReturnRequests = await returnRequests.save();
    res.status(httpStatus.CREATED);
    res.json(savedReturnRequests.transform());
  } catch (error) {
    next(error);
  }
};


/**
 * Get returnRequest list
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const returnRequests = await ReturnRequest.find();

    const maped = returnRequests.map((x) => x.transform());
    res.json(maped);
  } catch (error) {
    next(error);
  }
};

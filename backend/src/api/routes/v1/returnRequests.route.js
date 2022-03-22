const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/returnRequest.controller');
const { createReturnRequest } = require('../../validations/returnRequest.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/returnRequests List ReturnRequests
   * @apiDescription Get a list of returnRequests
   * @apiVersion 1.0.0
   * @apiName ListReturnRequests
   * @apiGroup ReturnRequests
   
   * @apiSuccess {Object[]} returnRequests List of returnRequests.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated returnRequests can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.get)

  /**
   * @api {post} v1/returnRequests Create ReturnRequests
   * @apiDescription Create a new returnRequests
   * @apiVersion 1.0.0
   * @apiName ReturnRequests
   * @apiGroup ReturnRequests
   *
   * @apiParam  {String}        [partSerialNumber]     partSerialNumber
   * @apiParam  {String}      [invoiceNumber]  invoiceNumber
   * @apiParam  {String}             [reasonOfReturn]       reasonOfReturn
   * @apiParam  {String}             [comments]     comments
   *
   * @apiSuccess (Created 201) {String}  id         ReturnRequests's id
   * @apiSuccess (Created 201) {String}  name       ReturnRequests's name
   * @apiSuccess (Created 201) {String}  email      ReturnRequests's email
   * @apiSuccess (Created 201) {String}  role       ReturnRequests's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(validate(createReturnRequest), controller.create);

module.exports = router;

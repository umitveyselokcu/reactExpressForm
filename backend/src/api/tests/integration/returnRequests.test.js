/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../../index');
const ReturnRequests = require('../../models/returnRequest.model')


describe('ReturnRequests API', async () => {
  beforeEach(async () => {
    dbReturnRequests = [
      {
        partSerialNumber: "testtest",
        invoiceNumber: "testt",
        reasonOfReturn: "test",
        comments: "test",
        
      },{
        partSerialNumber: "testtest",
        invoiceNumber: "testt",
        reasonOfReturn: "test",
        comments: "test",        
      }
    ];


    await ReturnRequests.deleteMany({});
    await ReturnRequests.insertMany(dbReturnRequests);
  });

  const params = { 
    partSerialNumber: "testtest",
    invoiceNumber: "testt",
    reasonOfReturn: "test",
    comments: "test"
  };

  
  describe('GET /v1/status', () => {
    it('should return OK', () => {
      return request(app)
        .get('/v1/status')
        .expect(httpStatus.OK)
        .then(async (res) => {
          expect(res.text).to.equal('OK');
        });
    });
  });

  describe('POST /v1/returnRequests', () => {
    it('should create a new returnRequests when request is ok', () => {
      return request(app)
        .post('/v1/returnRequests')
        .send(params)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(params);
        });
    });

    it('should return Validation Error when body is empty', () => {
      return request(app)
        .post('/v1/returnRequests')
        .send({})
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('Validation Error');
        });
    });
  });

  describe('GET /v1/returnRequests', () => {
    it('should get all returnRequests', () => {
      return request(app)
        .get('/v1/returnRequests')
        .expect(httpStatus.OK)
        .then(async (res) => {

          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
        });
    });
  });
});

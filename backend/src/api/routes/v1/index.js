const express = require('express');
const returnRequests = require('./returnRequests.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

/**
 * GET v1/returnRequests
 */
router.use('/returnRequests', returnRequests);

module.exports = router;

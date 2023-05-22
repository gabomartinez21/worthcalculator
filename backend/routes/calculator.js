const { Router } = require('express');
const { calculate } = require('../controllers/calculator');
const router = Router();

router.post('/calculate',[
], calculate);

module.exports = router;
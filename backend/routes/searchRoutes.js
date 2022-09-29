const Router = require('express').Router;
const { search } = require('../controllers/searchControllers.js');

const router = Router();

router.get('/:query', search);

module.exports = router;

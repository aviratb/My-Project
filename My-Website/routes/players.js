const express = require('express');
const router = express.Router();
const importData = require('../data.json');

router.get('/', (req, res) => {
    res.send(importData[1].name);
});

module.exports = router;

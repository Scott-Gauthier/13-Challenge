const router = require('express').Router();
const path = require('path');

//need tp update
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;
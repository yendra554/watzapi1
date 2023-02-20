const express = require('express');
const router = express.Router();
const userService = require('./user.service');


router.get('/', getAll);


module.exports = router;




async function getAll() {
    return await fs.readFileSync('log.txt', 'utf8');;
}










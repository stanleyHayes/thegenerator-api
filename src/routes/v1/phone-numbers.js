const express = require("express");
const {generatePhoneNumbers} = require("../../controllers/v1/phone-numbers");

const router = express.Router({mergeParams: true});

router.route('/').post(generatePhoneNumbers);

module.exports = router;
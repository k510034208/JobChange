var express = require('express');
const db = require('../../models/index');

var router = express.Router();

/* UPDATE /api/vX/update */
router.post('/update', async function (req, res, next) {

  // パラメータの受け取り
  var comp_id = req.body.comp_id;
  var content = req.body.content;
  var type = req.body.type;

  console.log('aaa');

});

module.exports = router;

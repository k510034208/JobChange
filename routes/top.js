var express = require('express');
var router = express.Router();
var db = require('../models/index');
const tools = require('../modules/tools');

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  // ログインチェック
  if (!tools.checkLoginstatus(req)) {
    res.redirect('/');
    return;
  }

  // 企業リストの取得
  var comp_list = await db.Company.findAll({
    where: {
      user_id : req.user,
    },
  });

  res.render('top', { comp_list:comp_list });
});

module.exports = router;

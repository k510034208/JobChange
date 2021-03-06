var express = require('express');
var router = express.Router();
var db = require('../models/index');
const tools = require('../modules/tools');

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  // ログインチェック
  if (!tools.checkIsLogin(req)) {
    res.redirect('/');
    return;
  }

  // CSRF対策
  if (!tools.checkCsrfToken(req)) {
    return next("err"); 
  }

  // ログインユーザの企業リストの取得
  var comp_list = await db.Company.findAll({
    where: {
      user_id : req.user,
    },
    order: [
      [ 'selection_status', 'DESC' ]
    ],

  });

  res.render('top', { comp_list:comp_list });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../models/index');
const tools = require('../modules/tools');

/* 
 * GET /company/id=xx 
 */
router.get('/', async function (req, res, next) {

  // リクエストパラメータの取得
  var comp_id = req.query.id;

  // ログインチェック
  if (!tools.checkLoginstatus(req)) {
    res.redirect('/');
    return;
  }

  // CSRF対策
  if (!tools.checkCsrf(req)) {
    return next("err"); 
  }
  
  // 所属チェック(権限がない場合はTOP画面に遷移させる)
  if (!tools.checkUserid(req,comp_id)) {
    res.redirect('/top');
    return;
  }


  // 企業の取得
  var comp = await db.Company.findOne({
    where: {
      user_id: req.user,
      id: comp_id
    },
  });



  res.render('company', {
    comp: comp,
  });
});

module.exports = router;

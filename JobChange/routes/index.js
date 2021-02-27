var express = require('express');
var router = express.Router();
var db = require('../models/index');
var MarkdownIt = require('markdown-it');
var markdown = new MarkdownIt();


/* GET home page. */
router.get('/', async function (req, res, next) {
  
  // 企業リストの取得
  var comp_list = await db.Company.findAll();

  res.render('index', { comp_list:comp_list });
});

/* 
 * GET /company/id=xx 
 */
router.get('/company', async function (req, res, next) {
  
  // リクエストパラメータの取得
  comp_id = req.query.id;

  // 企業の取得
  var comp = await db.Company.findByPk(comp_id);

  res.render('company', {
    comp: comp,
    analyze_memo: markdown.render(comp.analysis_memo),
    selection_memo: markdown.render(comp.selection_memo),
  });
});

module.exports = router;

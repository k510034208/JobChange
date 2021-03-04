var express = require('express');
const db = require('../../models/index');
var tools = require('../../modules/tools');

var router = express.Router();

/* CREATE /api/vX/create */
router.post('/create', async function (req, res, next) {

  // ログインチェック
  if (!tools.checkLoginstatus(req)) {

    // エラーレスポンス
    responseCreateApi(res, 'error', '')
    return;
  }

  // CSRF対策
  if (!tools.checkCsrf(req)) {
    // エラーレスポンス
    responseCreateApi(res, 'error', '')
    return;
 
  }
  
  // XSS対策
  if (!tools.sanitizeString(req.body)) {
    // エラーレスポンス
    responseCreateApi(res, 'error', '')
    return;
  }
  
 
  var comp;

  try {
      // DBトランザクション開始
      await db.sequelize.transaction(async (t) => {

        // 企業情報の作成
        comp = await db.Company.create({
          c_name: "新しい企業",
          url: "https://example.com/",
          application_requirement: "募集要項の要約を記録する",
          analysis_memo: "企業分析内容を記録する",
          selection_status: "未入力",
          selection_next_date: "次回選考日",
          selection_next_content: "次回選考内容",
          selection_memo: "選考に関するメモ、戦略",
          user_id:req.user,
        }, { transaction: t });
        
        console.log(comp);
    });

  } catch (err) {

    console.log(err);

    // エラーレスポンス
    responseCreateApi(res, 'error', comp.id)
    return;      
  }

  if (!comp.id) {

    // エラーレスポンス
    responseCreateApi(res, 'error', comp.id)
    return;    
  }

  // 正常レスポンス
  res.json({
    result: 'success',
    comp_id: comp.id
  });
  responseCreateApi(res, 'success', comp.id)
});



/* DELETE /api/vX/delete */
router.post('/delete', async function (req, res, next) {

  // パラメータの受け取り
  var comp_id = req.body.comp_id;

  // ログインチェック・所属チェック
  if (!tools.checkLoginstatus(req) || !tools.checkUserid(req,comp_id)) {

    // エラーレスポンス
    responseDeleteApi(res, 'error', comp_id)
    return;
  }

  // CSRF対策
  if (!tools.checkCsrf(req)) {
    // エラーレスポンス
    responseDeleteApi(res, 'error', comp_id)
    return;
  }

  // XSS対策
  if (!tools.sanitizeString(req.body)) {
    // エラーレスポンス
    responseDeleteApi(res, 'error', comp_id)
    return;
  }

  try {
    // DBトランザクション開始
    await db.sequelize.transaction(async (t) => {

      // 企業情の削除
      await db.Company.destroy({ where: { id: comp_id } }, { transaction: t });
    });

  } catch (err) {

    console.log(err);
    responseDeleteApi(res, 'error', comp_id)
    return;
    }

  // 正常レスポンス
  responseDeleteApi(res, 'success', comp_id)
  return;
});


/* UPDATE /api/vX/update */
router.post('/update', async function (req, res, next) {

  if (!tools.sanitizeString(req.body)) {
    // エラーレスポンス
    responseUpdateApi(res, 'error', '', '');
    return;
  }

  // パラメータの受け取り
  var comp_id = req.body.comp_id;
  var content = req.body.content;
  var item = req.body.item;

  // ログインチェック・所属チェック
  if (!tools.checkLoginstatus(req) || !tools.checkUserid(req,comp_id)) {

    // エラーレスポンス
    responseUpdateApi(res, 'error', content, item);
    return;
  }

  // CSRF対策
  if (!tools.checkCsrf(req)) {
    // エラーレスポンス
    responseUpdateApi(res, 'error', content, item);
    return;
  }

  var comp;

  try {

    // DBトランザクション開始
    await db.sequelize.transaction(async (t) => {

      if (item == 'c_name') {
        // c_nameの更新
        comp = await db.Company.update(
          {
            c_name: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });

      } else if (item == 'url') {

        // urlの更新
        comp = await db.Company.update(
          {
            url: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });
        
      } else if (item == 'application_requirement') {

        // application_requirementの更新
        comp = await db.Company.update(
          {
            application_requirement: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });

      } else if (item == 'analysis_memo') {

        // analysis_memoの更新
        comp = await db.Company.update(
          {
            analysis_memo: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });        
        
      } else if (item == 'selection_status') {

        // selection_statusの更新
        comp = await db.Company.update(
          {
            selection_status: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });        

      } else if (item == 'selection_next_content') {

        // selection_next_contentの更新
        comp = await db.Company.update(
          {
            selection_next_content: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });        

      } else if (item == 'selection_next_date') {

        // selection_next_dateの更新
        comp = await db.Company.update(
          {
            selection_next_date: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });        

      } else if (item == 'selection_memo') {

        // selection_memoの更新
        comp = await db.Company.update(
          {
            selection_memo: content,
          },
          {
            where: {
              id: comp_id
            }
          }, { transaction: t });
        }
    });

  }catch (err) {

    console.log(err);

    responseUpdateApi(res, 'error', content, item);
    return;
  }

  if (!comp) {
    responseUpdateApi(res, 'error', content, item);
    return;
  }

  // 正常レスポンス
  responseUpdateApi(res,'success', content, item);
});


// CREATE APIのレスポンス用の関数
function responseCreateApi(res, result, comp_id) {
  res.json({
    result: result,
    comp_id:comp_id
  })
}

// DELETE APIのレスポンス用の関数
function responseDeleteApi(res, result, comp_id) {
  res.json({
    result: result,
    comp_id:comp_id
  })
}

// UPDATE APIのレスポンス用の関数
function responseUpdateApi(res, result, content, item) {
  res.json({
    result: result,
    content: content,
    item:item
  });
}

module.exports = router;
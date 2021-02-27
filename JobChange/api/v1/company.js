var express = require('express');
const db = require('../../models/index');

var router = express.Router();

/* UPDATE /api/vX/delete */
router.post('/delete', async function (req, res, next) {
});

/* UPDATE /api/vX/update */
router.post('/update', async function (req, res, next) {

  // パラメータの受け取り
  var comp_id = req.body.comp_id;
  var content = req.body.content;
  var item = req.body.item;

  try {

    // DBトランザクション開始
    db.sequelize.transaction(async (t) => {

      if (item == 'url') {

        // urlの更新
        await db.Company.update(
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
        await db.Company.update(
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
        await db.Company.update(
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
        await db.Company.update(
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
        await db.Company.update(
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
        await db.Company.update(
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
        await db.Company.update(
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

    res.json({
      result: 'success',
      content: content,
      item:item
    });

    return;

  }catch (err) {

    console.log(err);

    res.json({
      result: 'error',
      content: content,
      item:item
    });
    return;
  }

  console.log('aaa');

});

module.exports = router;

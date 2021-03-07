var express = require('express');
var router = express.Router();
var db = require('../models/index');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var tools = require('../modules/tools');

/* GET home page. 
 */
router.get('/', async function (req, res, next) {

  // CSRF対策
  // トークン生成
  tools.createCsrfToken(req, res);

  res.render('index', {
    message: req.flash('error'),
    form: {
      username:''
    }
  });
});

/* GET home page. 
 */
router.get('/login', async function (req, res, next) {

  res.redirect('/');
});

/* POST login page. 
 */
router.post('/login', async function (req, res, next) {

  // CSRF対策
  if (!tools.checkCsrfToken(req)) {
    return next("err"); 
  }

  // 不正アクセス対策 パスワード誤入力時のアカウントロック
  try {
    var user = await db.User.findOne({
      where: {
        user_name: req.body.username
      }
    });

    if (user.fail_count >= 5) {
      res.render('index', {
        message: 'アカウントロック',
        form: {
          username: req.body.username,
        }
      });
      return;
    }

  } catch (err) {
    res.render('index', {
      message: 'エラー',
      form: {
        username: req.body.username,
      }
    });    
    return;
  }

  // ID/PW認証
  passport.authenticate('local', async function (err, user, info) {
    
    if (err) { return next(err); }

    if (!user) {

      // fail_countのカウントアップ      
      try {
        db.sequelize.transaction(async (t) => {

          // countup
          await db.User.increment('fail_count', {
            where: {
              user_name : req.body.username
            },
          }, { transaction: t });

        });

      } catch (err) {
        res.render('index', {
          message: 'エラー',
          form: {
            username: req.body.username,
          }
        });    
        return;
      }
    
      res.render('index', {
        message: '認証エラー',
        form: {
          username: req.body.username,
        }
      });
      return;
    }

    // ログイン成功
    req.logIn(user, function (err) {
      if (err) { return next(err); }
    
        // fail_countのクリア
        try {
          db.sequelize.transaction(async (t) => {
  
            await db.User.update({
              fail_count : 0
            }, {
              where: {
                user_name : req.body.username
              },
            }, { transaction: t });
          });
  
        } catch (err) {
          res.render('index', {
            message: 'エラー',
            form: {
              username: req.body.username,
            }
          });    
          return;
        }
       
      res.redirect('/top');
      return;
    });
  })(req,res,next)
});

module.exports = router;

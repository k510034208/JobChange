const db = require('../models/index');
const crypto = require('crypto');
var csrf = require('csrf');
var tokens = new csrf();

/*
 * ログイン済みかチェックする関数
 * @param  rer リクエスト
 */ 
exports.checkIsLogin = function (req) {
  
  if (!req.user) {
    return false;
  }
  return true;
}

/*
 * ログイン済みかチェックする関数
 * @param  raw_password  平文のパスワード
 */ 
exports.hashSha256 = function (raw_password) {
  return crypto.createHash('sha256').update(raw_password).digest('hex');
}

/*
 * 操作しているユーザが指定の企業に属しているかチェックする関数
 * @param req リクエスト
 * @param comp_id 企業ID
 */ 
exports.checkJoinUserId = async function (req, comp_id) {
  
  try {
    var comp = await db.Company.findOne({
      where: {
        user_id: req.user,
        id: comp_id,
      }
    });

    if (!comp) {
      return false;
    }

    return true;

  } catch (err) {
    return false;
  }
}

/*
 * サニタイジング要の関数（<,>,&,`が含まれる場合falseを返却する）
 * @param requestBodyObject リクエストのbody
 */ 
exports.sanitizeString = function(requestBodyObject){

  if (typeof (requestBodyObject) != 'object') {
    return false;
  }

  for (var key in requestBodyObject) {
  
    var string = requestBodyObject[ key ];
    if (string.indexOf('>')!=-1 || string.indexOf('<')!=-1 || string.indexOf('&')!=-1 || string.indexOf('`')!=-1) {
      return false;
    }
  }

  return true;
}

/*
 * CSRF対策のためtokenを作成する関数
 * @param req リクエスト
 * @param res レスポンス
 */ 
exports.createCsrfToken = function (req, res) {
  var secret = tokens.secretSync();
  var token = tokens.create(secret);

  // 秘密文字をセッションに保存する
  req.session._csrf = secret;
  // トークンをCookieに保存する
  res.cookie('_csrf', token);

  return
}

/*
 * CSRF対策のためtokenをチェックする関数
 * @param req リクエスト
 */ 
exports.checkCsrfToken = function (req) {
  
  var secret = req.session._csrf;
  var token = req.cookies._csrf;

  // トークンチェックする
  if (!tokens.verify(secret, token)) {
    return false;
  }
  return true;
}
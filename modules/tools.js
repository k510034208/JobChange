const db = require('../models/index');
const crypto = require('crypto');


// ログインチェック
exports.checkLoginstatus = function (req) {
  
  if (!req.user) {
    return false;
  }
  return true;
}

// パスワードのハッシュ化用の関数
exports.hashSha256 = function (value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

// 権限チェック
exports.checkUserid = async function (req, comp_id) {
  
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

// サニタイジング文字列チェック
// 「<」「>」「&」「"」「`」をエーラーとする
exports.sanitizeString = function(stringObject){

  if (typeof (stringObject) != 'object') {
    return false;
  }

  for (var key in stringObject) {
  
    var string = stringObject[ key ];
    if (string.indexOf('>')!=-1 || string.indexOf('<')!=-1 || string.indexOf('&')!=-1 || string.indexOf('`')!=-1) {
      return false;
    }
  }

  return true;
}
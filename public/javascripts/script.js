  // サニタイジング対象文字列のチェック
function checkSanityzeWord (value) {
  
  if (value.indexOf('>')!=-1 || value.indexOf('<')!=-1 || value.indexOf('&')!=-1 || value.indexOf('`')!=-1) {
    return false;
  }
  return true;
}

// 値のNULLチェック
function checkNull (value) {

  if (!value) {
    return false;
  }
  return true;
}

// 入力値の長さチェック
function checkLength (value, length) {
  
  if (value.length > length) {
    return false;    
  }
  return true;
}

// URL形式チェック
function checkUrlFormat (value) {
  
  var pattern = new RegExp('^(https?:\\/\\/)');
  if (!pattern.test(value)) {
    return false
  }  
  return true;
}

// 日付フォーマットチェック
function checkDateFormat (value) {
  var pattern = new RegExp('^20[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$');

  if (!pattern.test(value)) {
    return false
  }  
  return true;
}

// 選考状況のフォーマットチェック
function checkSelectionStatus (value) {
  var pattern = new RegExp('^[0-9]{2}:.*');

  if (!pattern.test(value)) {
    return false
  }  
  return true;
}
function getSheet(name) {
  //const SPREADSHEET_ID = '1SUU9brxCzg69AbdVlCyQXvLJyXrMx7eXTOge4YB7Fmo'
  const SPREADSHEET_ID = '1qwJJcxm-vDsi-JfVKMUHIxcjcgelRPP3MjP3fmCnkPk';
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }
  return sheet;
}

function getLastValues(name,length) { //最後にスプレッドシートに書き込んだ情報を取得
  return getSheet(name).getRange(length,1,1,6).getValues()
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}

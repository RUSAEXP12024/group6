function reply(reply_message, type){
  let reply_token = getSheet('state').getRange(2, 5).getValue();
  let sheet_log = getSheet('log');
  let contents;
  //let sheet_log = getSheet('log');
  //sheet_log.appendRow([new Date(), "result"]);
  if(type == "text") {
    contents = {
      replyToken: reply_token, // event.replyToken は受信したメッセージに含まれる応答トークン
      messages: [{ type: 'text', text: reply_message }],
    };
  }
  else if(type == "image") {
    contents = {
      replyToken: reply_token,
      messages: [{ type: 'image', originalContentUrl: reply_message, previewImageUrl: reply_message}],
    };
  }
  let channelAccessToken = "9srbO4EQEi9A3jT+j+5qM4a3haX6mYew8C7BtQB7dhNeFobNiZPoiNXJ4qSW3Jp8oouU7MBlhMBns89vmDa0MJRYGKMDv3p8fVBRgyE3Y7uflZ5e3FAnah9SFgY2DKvyPDD26jhqtuQ/87Q6eblgOAdB04t89/1O/w1cDnyilFU=";
  let replyUrl = "https://api.line.me/v2/bot/message/reply"; // LINE にデータを送り返すときに使う URL
  sheet_log.appendRow([new Date(), "result1"]);
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // リクエストボディは payload に入れる
  };
  UrlFetchApp.fetch(replyUrl, options);
}

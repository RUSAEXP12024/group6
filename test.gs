function doPost(e){
  let sheet_log = getSheet('log');
  let sheet_state = getSheet('state');
  sheet_log.appendRow([new Date(), e.postData.contents]);

  let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する
  let events = data.events;

  for(let i = 0; i < events.length; i++){ // すべてのイベントについて繰り返し処理をする
    let event = events[i];
    if(event.type == 'message'){ // メッセージ受信イベントであるか判定
      if(event.message.type == 'text'){ // 受信したのが普通のテキストメッセージであるか、スタンプならsticker

        //sheet.appendRow([new Date(), event.message.text]); // スプレッドシートに追記

        var user_message = event.message.text;
        var reply_message = "";
        var reply_token = event.replyToken;
        sheet_state.getRange(2, 5).setValue(reply_token);
        //var user_id = event.source.userId;
        var entry_mode = sheet_state.getRange(2, 1).getValue();
        var time_mode = sheet_state.getRange(2, 2).getValue();

        if(entry_mode == '0') {
          if(user_message == "警戒") {
            reply("開始時刻を数値(0~2359)で入力してください", "text");
            sheet_state.getRange(2, 1).setValue(1);//timeモードON
            sheet_state.getRange(2, 2).setValue(0);//startに入力
          }
          else if(user_message == "通知") {
            ;
          }
          else if(user_message == "グラフ") {
            sheet_log.appendRow([new Date(), "result2"]);
            reply(saveGraph(), "image");
          }
          else {
            reply("警戒を開始する場合は「警戒」と送信してください", "text");
          }
        }
        else {
          if(check_time(user_message) == true) {
            var hour = Math.floor(user_message / 100);
            var minute = user_message % 100;

            if(time_mode == '0') {
              //sheet_log.appendRow([new Date(), user_message]);
              sheet_state.getRange(2, 3).setValue(user_message);
              sheet_state.getRange(2, 2).setValue(1);

              reply("終了時刻を数値(0~2359)で入力してください", "text");
            }
            else {
              sheet_state.getRange(2, 4).setValue(user_message);
              sheet_state.getRange(2, 1).setValue(0);

              let start = sheet_state.getRange(2, 3).getValue();
              let end = sheet_state.getRange(2, 4).getValue();

              let start_hour = Math.floor(start / 100);
              let start_minute = start % 100;
              let end_hour = Math.floor(end / 100);
              let end_minute = end % 100;
              
              reply_message = "以下の時刻で設定しました\n\n"
                + "開始時刻:" + start_hour + "時" + start_minute + "分\n"
                + "終了時刻:" + end_hour + "時" + end_minute + "分\n\n"
                + "通知を受け取る場合、「通知」と送信してください";
              reply(reply_message, "text");
            }
          }
          else {
            reply("正しい数値(0~2359)を入力してください", "text");
          }
        }
        //reply(reply_token, reply_message);
        //reply(user_id, reply_message);
      }
    }
  }
}

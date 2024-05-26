function send_list() {
  let reply_token = getSheet('state').getRange(2, 5).getValue();
  let sheet_sensor = getSheet('sensor');
  let reply_message = "本日に感知した時間の一覧です\n\n";

  let i = 1;
  let value;
  let max_temp = -Infinity;
  let min_temp = Infinity;

  do{
    let temp = sheet_sensor.getRange(i, 2).getValue();
    if (temp < min_temp) {
      min_temp = temp;
    }
    if (max_temp < temp) {
      max_temp = temp;
    }

    if(value == 1.0) {
      let time_stamp = sheet_sensor.getRange(i, 5).getValue();
      
      if(time_stamp instanceof Date) {
        let hours = time_stamp.getHours();
        let minutes = time_stamp.getMinutes();

        if(hours < 10) {
          hours = '0' + hours;
        }
        if(minutes < 10) {
          minutes = '0' + minutes;
        }
        reply_message += hours + ':' + minutes + '\n';
      }
    }
    i++;
    value = sheet_sensor.getRange(i, 6).getValue();
  }while(value !== "");


  reply_message += "\n今日の最高気温は" + max_temp + "℃でした\n"
        + "今日の最低気温は" + min_temp + "℃でした\n";
  reply(reply_message, "text");
}

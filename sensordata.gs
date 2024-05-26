function recordSensorData() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  let lastSensorData = getLastData("sensor");　　　　　//最終data取得
  let lastlogData = getLastData("log");
  let last = getLastValues("sensor",lastSensorData)
  let date_1 = Utilities.formatDate(new Date(),'JST','yyyy-MM-dd')
  let date_2 = Utilities.formatDate(last[0][0],'JST','yyyy-MM-dd')
  let time = Utilities.formatDate(new Date(), 'JST', 'HH') + Utilities.formatDate(new Date(), 'JST', 'mm') // 現在時刻 数字４桁
  const startTime = getSheet('state').getRange('C2').getValue()
  const endTime = getSheet('state').getRange('D2').getValue()
  let reply_token = getSheet('state').getRange(2, 5).getValue();

  var arg = {
    te:deviceData[0].newest_events.te.val,　　//温度
    hu:deviceData[0].newest_events.hu.val,　　//湿度
    il:deviceData[0].newest_events.il.val,　　//照度
    motime:Utilities.formatDate(new Date(deviceData[0].newest_events.mo.created_at),'JST','HH:mm'),
    mo:last[0][5],　　//人感センサの変化の有無
    motimelong:deviceData[0].newest_events.mo.created_at
  }
  Logger.log(arg.motime)
  Logger.log(arg.mo)
  Logger.log(last[0][0])
  Logger.log(last[0][4])
  Logger.log(arg.motime)
  Logger.log(last[0][5])
  Logger.log(new Date())
  Logger.log(date_1)
  Logger.log(date_2)
  Logger.log(time)
  Logger.log(arg.motimelong)
  Logger.log(last[0][6])
  if(lastSensorData >= 2 && arg.motimelong != last[0][6]){   //人感センサの反応時刻が変わっているか判定
    arg.mo=1   //変わっていれば、arg.moに1を代入。
    if(time >= startTime && time <= endTime){ //現在時刻が監視時間内か判定
      Logger.log("あぶないよ！>o<")
      let reply_message = "人感センサーが反応しました\n" + arg.motime
        + "\n\n次の通知を受け取る際は「通知」と送信してください";
      reply(reply_message, "text");
    }
    if(arg.il < 50){//監視時間外で照度が基準値以下なら
      Logger.log("照明つけるよ！^o^")
      light_on()
    }
  }else{
    arg.mo=0   //そうでなければ0を代入。
  }
  if(lastSensorData >= 2 && date_1 != date_2){   //日付が変わったか判定
    deleteSensorData("sensor",lastSensorData)   //スプレッドシートに溜まった情報をセルごと削除
    deleteSensorData("log",lastlogData)
    lastSensorData = getLastData("sensor")   //スプレッドシートのセルの行数を再取得
  }
  setSensorData(arg, lastSensorData + 1);   //スプレッドシートに記録する
}
function setSensorData(data, row) {
  getSheet('sensor').getRange(row, 1, 1, 7).setValues([[new Date(), data.te, data.hu, data.il, data.motime, data.mo, data.motimelong]])
}
function deleteSensorData(name,row) {
  getSheet(name).getRange(2, 1, row, 7).deleteCells(SpreadsheetApp.Dimension.ROWS)
}

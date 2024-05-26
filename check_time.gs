function check_time(user_message) {
  if( 0 <= user_message && user_message <= 2359 ){
    var hour = Math.floor(user_message / 100);
    var minute = user_message % 100;

    if( 0 <= hour && hour <= 23 ) {
      if( 0 <= minute && minute <= 59) {
        //Logger.log(hour);
        //Logger.log(minute);
        return true;
      }
    }
  }
  return false;
}

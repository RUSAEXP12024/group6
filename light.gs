function light_on(){
  const appliance = getNatureRemoData("appliances");
  const id = appliance[0].id   //appliance[]の[]の中の番号は、アプリ内のアイコンの何番目に照明を設定したか。1番目に設定した場合は0
  const payload = {
    "button" : "on"
  };
  postNatureRemo("appliances/"+id+"/light",payload);
}

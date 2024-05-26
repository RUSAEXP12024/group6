function saveGraph() {
  //const chartUrl = "https://page.mkgr.jp/ownedmedia/wordpress/wp-content/uploads/2023/11/image1-1.jpg";

  const graph = getSheet('sensor').getCharts();
  const graphImage = graph[0].getBlob();
  const folder = DriveApp.getFolderById("1-WeKvXWWpM97ibC6rQhpfutYzGwJUI1P");
  const file = folder.createFile(graphImage.setName("温度と湿度"));
  file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
  
  return file.getDownloadUrl();
  /*
  const encodedUrl = encodeURI(chartUrl);
  return encodedUrl;
  */
}

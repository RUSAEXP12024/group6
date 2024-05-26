function postNatureRemo(endpoint,payload) {
  //const REMO_ACCESS_TOKEN = 'アクセストークンを入力'
  const REMO_ACCESS_TOKEN = 'xORWvR1UB_8b1bJk1-ofxtQNG-1PNCJBEpEIglpQ81Q.HyHgt8qQmEBPuRfGKYknDMajnLYLLhx4xYaulwFtmYc';
  const headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
  const options = {
    "method" : "post",
    "headers" : headers,
    "payload" : payload,
  };
  UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options)
}

function getNatureRemoData(endpoint) {
  //const REMO_ACCESS_TOKEN = 'アクセストークンを入力'
  const REMO_ACCESS_TOKEN = 'xORWvR1UB_8b1bJk1-ofxtQNG-1PNCJBEpEIglpQ81Q.HyHgt8qQmEBPuRfGKYknDMajnLYLLhx4xYaulwFtmYc';
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };

  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}

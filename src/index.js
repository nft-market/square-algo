import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import constant from './util/constant.js'
import Web3 from "web3";

import 'antd/dist/antd.css';

let ethereum = window.ethereum;
if (ethereum) {
  let web3 = new Web3(ethereum)

  for (let index in constant.tokenCoins.slaveTokenCoins) {
    constant.tokenCoins.slaveTokenCoins[index].contract = new web3.eth.Contract(constant.tokenCoins.slaveTokenCoins[index].abi)
    constant.tokenCoins.slaveTokenCoins[index].contract.options.address = constant.tokenCoins.slaveTokenCoins[index].contractAddress
  }
}

window.chair_config = constant;

window.getrequest = () => {  
  //url例子：www.bicycle.com?id="123456"&Name="bicycle"；  
  var url = decodeURI(window.location); //?id="123456"&Name="bicycle";
  var object = {};
  if(url.indexOf("?") != -1)//url中存在问号，也就说有参数。  
  {   
    var strarr = url.split("?");  //得到?后面的字符串
    for(const urlindex in strarr){
      if (urlindex == 0) continue;
      const str = strarr[urlindex];
      var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
      for(var i = 0; i < strs.length; i ++)  
        {   
          object[strs[i].split("=")[0]]=strs[i].split("=")[1]
        }
      }
    }
  return object;  
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

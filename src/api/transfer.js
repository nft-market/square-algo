import axios from "axios"

let initTransfer = async function (tokenid, from, to) {
  let result;
  let formJson = {
    "tokenId": tokenid,
    "from": from,
    "to": to
  }
  console.log("new Transfer:", JSON.stringify(formJson))
  await axios.post(window.chair_config.baseUrl2 + `/nftTransfer/init`, formJson).then(function (res) {
    if (res.status == 200) {
      result = res;
    } else {
      alert("Failed to init transfer request!");
    }
  });
  return result;
}

//   √ POST("/order/hash/update", handler.OrderHashUpdate)
let transferHashUpdate = async function (id, hash) {
  let result
  let formJson = {
    "id": id,
    "txhash": hash
  }
  console.log("transfer Update:", JSON.stringify(formJson))
  await axios.post(window.chair_config.baseUrl2 + `/nftTransfer/updateTxHash`, formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to update transfer hash!");
    }
  });
  return result;
}


let api = {
  initTransfer,
  transferHashUpdate
}
export default api
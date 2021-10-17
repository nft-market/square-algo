import axios from "axios"
// import Vue from "vue"

// const Vue = {
//   prototype:{
//     $rootUrl: "http://v1test.trade.chair.finance",
//     $baseUrl: 'http://v1test.trade.chair.finance/api/v1',
//     $imageBaseUrl: "http://v1test.trade.chair.finance",
//     $ipfsBaseUrl: "https://ipfs.io/ipfs/",
//   }
// }
// const baseurl = 'http://v1test.trade.chair.finance/api/v1';
/**
 * NFT
 */
//  nft √ GET("/nft/getByTokenId", tokenid)
let nftGetByTokenId = async function (tokenid) {
  let result
  await axios.get(window.chair_config.baseUrl + `/nft/getByTokenId?tokenid=${tokenid}`).then(function (res) {
    if (res.status == 200) {
      result = res.data.result[0]
    } else {
      alert("Failed to get nft request!");
    }
  });
  return result;
}
//  nft √ GET("/nft/mySalability", address,market_status)
let nftMySalability = async function (address, market_status, pageNo, pageSize) {
  let result = {}
  result.list = new Array();
  result.total = 0;
  let url = window.chair_config.baseUrl + `/nft/mySalability?address=${address}&market_status=${market_status}&page_no=${pageNo}&page_size=${pageSize}`
  await axios.get(url).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result.result
      result.total = res.data.result.total
      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.list.push({
            tokenID: res_tmp[j].token_id,
            nft_name: res_tmp[j].nft_name,
            nft_desc: res_tmp[j].nft_desc,
            media_uri: res_tmp[j].media_uri,
            mid: res_tmp[j].mid,
            tokenURI: "",
            startingPrice: res_tmp[j].starting_price + " " + res_tmp[j].token_type,
            tax: res_tmp[j].create_tax + "%",
            endTime: res_tmp[j].end_time,
            createTime: res_tmp[j].market_create_time })
        }
      }

    } else {
      alert("Failed to get nft request!");
    }
  });
  return result;
}
//  POST("/nft/new")
let nftNew = async function (sn,
                             nft_name,
                             nft_desc,
                             rights_rules,
                             media_uri,
                             media_hash,
                             create_tax,
                             creator,
                             owner) {
  let responseJSON = null
  let nftJSON2API = {
    "sn": sn,
    "nft_name": nft_name,
    "nft_desc": nft_desc,
    "rights_rules": rights_rules,
    "media_uri": media_uri,
    "create_tax": create_tax + "",
    "creater": creator,
    "owner": owner
  }
  let nftJSON2IPFS = {
    "nft_name": nft_name,
    "nft_desc": nft_desc,
    "rights_rules": rights_rules,
    "media_uri": media_hash,
    "create_tax": create_tax,
    "creater": creator
  }
  console.log("nftJSON2API:", JSON.stringify(nftJSON2API))
  console.log("nftJSON2IPFS:", JSON.stringify(nftJSON2IPFS))
  await axios.post(window.chair_config.baseUrl + `/nft/new`, nftJSON2API).then(function (res) {
    console.log(res);
  });
  await axios.post(window.chair_config.rootUrl + `/api/v2/nft/json`, nftJSON2IPFS).then(function (res) {
    console.log(res);
    responseJSON = res.data;
  });
  return responseJSON;
}
//   √ chain.POST("/nft/hash/update", sn,hash)
let nftHashUpdate = async function (sn, hash) {
  let result;
  let formJson = {
    "sn": sn,
    "hash": hash
  }
  await axios.post(window.chair_config.baseUrl + `/nft/hash/update`,formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("/nft/type", handler.NftType)
let nftType = async function () {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/nft/type`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            id: res_tmp[j].id,
            type_name: res_tmp[j].type_name
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
/**
 * Market List
 */
//  Market √ POST("/market/new", sn,creater,tokenid,market_type,starting_price,token_type,end_time,bonus)
let marketNew = async function (sn, creater, tokenid, market_type, starting_price, token_type, end_time, bonus) {
  let result = {
    code: 200,
    msg: 'ok'
  };
  let formJson = {
    "sn": sn,
    "creater": creater,
    "tokenid": tokenid,
    "market_type": market_type,
    "starting_price": starting_price,
    "token_type": token_type,
    "end_time": end_time,
    "bonus": bonus
  }
  console.log("new Market:", JSON.stringify(formJson))
  await axios.post(window.chair_config.baseUrl + `/market/new`, formJson).then(function (res) {

    if (res.status == 200) {
      if (res.data.result !== undefined && res.data.result != '') {
        result.code = 500
        result.msg = res.data.result
      }
    } else {
      result.code = 500
      result.msg =  'server error'
    }


  });
  return result;
}
//  Market √ GET("/market/getByMid", mid)
let marketGetByMid = async function (mid) {
  let result;
  await axios.get(window.chair_config.baseUrl + `/market/getByMid?mid=${mid}`).then(function (res) {
    if (res.status == 200) {
      result = res.data.result[0]
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("/market/getByTokenId", tokenid,mid,status)
let marketByTokenId = async function (tokenid, mid, status, bidder) {
  let result = new Array()
  let url = undefined;
  if (bidder === undefined) {
    url = window.chair_config.baseUrl + `/market/getByTokenId?tokenid=${tokenid}&mid=${mid}&status=${status}`;
  } else {
    url = window.chair_config.baseUrl + `/market/getByTokenId?tokenid=${tokenid}&mid=${mid}&status=${status}&bidder=${bidder}`;
  }
  await axios.get(url).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            media_uri: res_tmp[j].media_uri,
            logo_url: window.chair_config.imageBaseUrl + res_tmp[j].media_uri,
            nft_name: res_tmp[j].nft_name,
            nft_name_zh: res_tmp[j].nft_name_zh,
            tokenid: res_tmp[j].token_id,
            approved: res_tmp[j].approved,
            bonus: res_tmp[j].bonus,
            market_type: res_tmp[j].market_type,
            create_tax: res_tmp[j].create_tax,
            owner: res_tmp[j].owner,
            create_time: res_tmp[j].create_time,
            create_time_int: res_tmp[j].create_time_int,
            nft_create_time: res_tmp[j].nft_create_time,
            end_time: res_tmp[j].end_time,
            end_time_int: res_tmp[j].end_time_int,
            bn: res_tmp[j].create_number,
            nft_desc: res_tmp[j].nft_desc,
            nft_desc_zh: res_tmp[j].nft_desc_zh,
            txhash: res_tmp[j].txhash,
            token_type: res_tmp[j].token_type,
            starting_price: res_tmp[j].starting_price,
            my_bid_max_price: res_tmp[j].my_bid_max_price,
            my_bid_min_price: res_tmp[j].my_bid_min_price,
            show_price: res_tmp[j].starting_price + " " + res_tmp[j].token_type,
            mid: res_tmp[j].id,
            rights_rules: res_tmp[j].reights_rules,
            my_sum_price:res_tmp[j].my_sum_price,
            sum_quan:res_tmp[j].sum_quan,
            my_sum_quan:res_tmp[j].my_sum_quan,
            open_guess:res_tmp[j].open_guess
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("/market/all", page,rows,type,status)
let marketAllHandle = async function (page, rows, type, status,timeStatus,nftType,currency,sort, aid) {
  let list = new Array();
  let result = new Object();
  let total;
  if (aid === undefined || aid === null) {
    aid = "";
  }
  await axios.get(window.chair_config.baseUrl + `/market/all?page=${page}&rows=${rows}&type=${type}&status=${status}&nftType=${nftType}&timeStatus=${timeStatus}&currency=${currency}&sort=${sort}&aid=${aid}`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result.result
      total = res.data.result.total

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          list.push({
            media_uri: res_tmp[j].media_uri,
            logo_url: window.chair_config.imageBaseUrl + res_tmp[j].media_uri,
            nft_name: res_tmp[j].nft_name,
            nft_name_zh: res_tmp[j].nft_name_zh,
            tokenid: res_tmp[j].token_id,
            approved: res_tmp[j].approved,
            starting_price: res_tmp[j].starting_price + " " + res_tmp[j].token_type,
            mid: res_tmp[j].id
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  result.total = total
  result.list = list 
  return result;
}
//  √ POST("/market/hash/update", sn,hash)
let marketHashUpdate = async function (sn, hash) {
  let result;
  let formJson = {
    "sn": sn,
    "hash": hash
  }
  await axios.post(window.chair_config.baseUrl + `/market/hash/update`,formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ POST("/market/cancelHash/update", tokenid,hash)
let marketCancelHashUpdate = async function (tokenid, hash) {
  let result;
  let formJson = {
    "tokenid": tokenid,
    "hash": hash
  }
  await axios.post(window.chair_config.baseUrl + `/market/cancelHash/update`,formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ POST("/market/dealHash/update", tokenid,hash)
let marketDealHashUpdate = async function (tokenid, hash) {
  let result;
  let formJson = {
    "tokenid": tokenid,
    "hash": hash
  }
  await axios.post(window.chair_config.baseUrl + `/market/dealHash/update`,formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
// √ GET("/home/limiteds", rows)
let homeLimitedsHandle = async function (rows) {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/home/limiteds?rows=${rows}`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            media_uri: res_tmp[j].media_uri,
            logo_url: window.chair_config.imageBaseUrl + res_tmp[j].media_uri,
            nft_name: res_tmp[j].nft_name,
            nft_name_zh: res_tmp[j].nft_name_zh,
            tokenid: res_tmp[j].token_id,
            approved: res_tmp[j].approved,
            starting_price: res_tmp[j].starting_price + " " + res_tmp[j].token_type,
            mid: res_tmp[j].id
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
// √ GET("/home/auctions", rows)
let homeAuctionsHandle = async function (rows) {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/home/auctions?rows=${rows}`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            media_uri: res_tmp[j].media_uri,
            logo_url: window.chair_config.imageBaseUrl + res_tmp[j].media_uri,
            nft_name: res_tmp[j].nft_name,
            nft_name_zh: res_tmp[j].nft_name_zh,
            tokenid: res_tmp[j].token_id,
            approved: res_tmp[j].approved,
            starting_price: res_tmp[j].starting_price + " " + res_tmp[j].token_type,
            mid: res_tmp[j].id
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("/home/banners", rows)
let HomeBanners = async function (rows) {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/home/banners`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            id: res_tmp[j].id,
            banner_name: res_tmp[j].banner_name,
            banner_img: res_tmp[j].banner_img,
            banner_url: res_tmp[j].banner_url
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
/**
 * Order
 */
//   √ POST("/order/new", sn,mid,mtype,tokenid,create_time,buyer,seller,price,token_type)
let orderNew = async function (sn, mid, mtype, tokenid, create_time, buyer, seller, price, token_type) {
  let result;
  let formJson = {
    "sn": sn,
    "mid": mid,
    "mtype": mtype,
    "tokenid": tokenid,
    "create_time": create_time,
    "buyer": buyer,
    "seller": seller,
    "price": price,
    "token_type": token_type
  }
  console.log("new Order:", JSON.stringify(formJson))
  await axios.post(window.chair_config.baseUrl + `/order/new`, formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to new nft request!");
    }
  });
  return result;
}
/**
 * Token approve
 */
let tokenApprove = async function (tokenSymbol, address, value, fromAddr) {

  const tokenCoinSearch = function(symbol) {
    for (let index in window.chair_config.tokenCoins.slaveTokenCoins) {
      if (symbol === window.chair_config.tokenCoins.slaveTokenCoins[index].symbol) {
        return window.chair_config.tokenCoins.slaveTokenCoins[index];
      }
    }
    return window.chair_config.tokenCoins.masterTokenCoin;
  }

  let result = window.chair_config.tokenCoins.masterTokenCoin.symbol
  let tokenCoin = tokenCoinSearch(tokenSymbol)
  if (tokenCoin.symbol === window.chair_config.tokenCoins.masterTokenCoin.symbol) {
    return result;
  }
  console.log("tokenApprove param：",  tokenCoin.symbol, address, value, fromAddr);
    await tokenCoin.contract.methods
        .approve(address, value)
        .send({ from: fromAddr }, (err, res) => {
          result = res
          if (err) {
            console.log("tokenApprove err：", err);
          }
        });
  return result;
}
//   √ GET("/order/getByOid", oid)
let orderGetByOid = async function (oid) {
  let result;
  await axios.get(window.chair_config.baseUrl + `/order/getByOid?oid=${oid}`).then(function (res) {
    if (res.status == 200) {
      result = res.data.result[0]
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("order/getMaxPrice", tokenid,mid)
let orderGetMaxPrice = async function (tokenid,mid) {
  let result;
  await axios.get(window.chair_config.baseUrl + `/order/getMaxPrice?tokenid=${tokenid}&mid=${mid}`).then(function (res) {
    if (res.status == 200) {
      result = res.data.result
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//  r √ GET("/order/getByTokenId", tokenid, mid, ismid, status, pageno, pagesize)
let orderGetByTokenId = async function (tokenid, mid, ismid, status, buyer, pageno, pagesize) {
  let result = {}
  result.list = new Array();
  result.total = 0;
  await axios.get(window.chair_config.baseUrl + `/order/getByTokenId?tokenid=${tokenid}&status=${status}&mid=${mid}&ismid=${ismid}&buyer=${buyer}&page_no=${pageno}&page_size=${pagesize}`).then(function (res) {
    console.log(res);
    if (res.status == 200) {
      let res_tmp = res.data.result.result
      result.total = res.data.result.total
      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          let onchain_time = res_tmp[j].onchain_time
          if (res_tmp[j].onchain_time === '1970-01-01 08:00:00') {
            onchain_time = res_tmp[j].create_time
          }
          let status = 'success'
          if (res_tmp[j].status == 0) {
            status = 'pending'
          } else if (res_tmp[j].status == 1) {
            status = 'success'
          } else if (res_tmp[j].status == 2) {
            status = 'failed'
          }
          result.list.push({
            onchain_time: onchain_time,
            txhash: res_tmp[j].txhash,
            price: res_tmp[j].price + " " + res_tmp[j].token_type,
            seller: res_tmp[j].seller,
            bidder: res_tmp[j].buyer,
            status: status
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ GET("/order/getByBuyer", buyer, mtype, status)
let orderGetByBuyer = async function (buyer, mtype, status) {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/order/getByBuyer?buyer=${buyer}&mtype=${mtype}&status=${status}`).then(function (res) {
    if (res.status == 200) {
      let res_tmp = res.data.result

      if (res_tmp !== undefined && res_tmp !== null) {
        for (var j = 0, len = res_tmp.length; j < len; j++) {
          result.push({
            onchain_time: res_tmp[j].onchain_time,
            end_time: res_tmp[j].end_time,
            price: res_tmp[j].price + " " + res_tmp[j].token_type,
            status: res_tmp[j].status,
            tokenid: res_tmp[j].tokenid,
            txhash: res_tmp[j].txhash,
            token_type: res_tmp[j].token_type,
            media_uri: res_tmp[j].media_uri,
            nft_name: res_tmp[j].nft_name,
            nft_desc: res_tmp[j].nft_desc,
            seller: res_tmp[j].seller,
            mid: res_tmp[j].mid
          })
        }
      }

    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}
//   √ POST("/order/hash/update", handler.OrderHashUpdate)
let orderHashUpdate = async function (sn, hash) {
  let result
  let formJson = {
    "sn": sn,
    "hash": hash
  }
  await axios.post(window.chair_config.baseUrl + `/order/hash/update`,formJson).then(function (res) {
    if (res.status == 200) {
      result = "ok"
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}

let orderStatusUpdate = async function (sn, status) {
  let formJson = {
    "sn": sn,
    "status": status
  }
  await axios.post(window.chair_config.baseUrl + `/order/status/update`,formJson).then(function (res) {});
}

let HomeActivities = async function (aid) {
  let result = new Array()
  await axios.get(window.chair_config.baseUrl + `/home/activities?aid=${aid}`).then(function (res) {
    if (res.status == 200) {
      result = res.data.result
    } else {
      alert("Failed to get my all nft request!");
    }
  });
  return result;
}

let api = {
  nftGetByTokenId, nftMySalability, nftNew, nftHashUpdate, nftType,marketNew, marketGetByMid, marketByTokenId, 
  marketAllHandle, marketHashUpdate, marketCancelHashUpdate, marketDealHashUpdate, orderNew, orderGetByOid, orderGetMaxPrice,
  orderGetByTokenId, orderGetByBuyer, orderHashUpdate, orderStatusUpdate, tokenApprove, homeLimitedsHandle, homeAuctionsHandle, HomeBanners, HomeActivities
}
export default api
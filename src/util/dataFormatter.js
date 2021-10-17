const formatItemList = (list) => { // todo Deaso: 商品列表和角色的列表要分开。
    if(!list) return [];
    var newList = [];
    for(var index in list){
      newList[index] = {};
      // newList[index].image = list[index].logo_url;
      // newList[index].image2x = list[index].logo_url;
      newList[index].ori = list[index];
      newList[index].tokenId = (list[index].tokenID || list[index].tokenid);
      newList[index].mid = list[index].mid;
      newList[index].image = list[index].media_uri ? window.chair_config.imageBaseUrl + list[index].media_uri : "/chair/common/logo.jpg";
      newList[index].image2x = list[index].media_uri ? window.chair_config.imageBaseUrl + list[index].media_uri : "/chair/common/logo.jpg";
      newList[index].approved = list[index].approved;
      newList[index].title = list[index].nft_name;
      newList[index].title_zh = list[index].nft_name_zh;
      newList[index].price = list[index].starting_price;
      newList[index].users = [{avatar: '/chair/common/defaultavatar.svg'}]
      // todo Deaso: 两个大小写，真就折磨前端呗
      newList[index].counter = (list[index].tokenID || list[index].tokenid);
      newList[index].highestBid = '绝版艺术品，不容错过！';
      newList[index].bid = '热卖中 <span role="img" aria-label="fire">🔥</span>';
      newList[index].url = "/";
    }
    return newList;
  }
  
  export default {
    formatItemList
  }
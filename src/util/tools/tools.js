import Web3 from "web3";
let web3 = new Web3()
let formatTime = function (val) {

    let dateTime = new Date(val);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    if (month < 10) {
        month = '0' + month
    }
    let day = dateTime.getDate();
    if (day < 10) {
        day = '0' + day
    }
    let hour = dateTime.getHours();
    if (hour < 10) {
        hour = '0' + hour
    }
    let min = dateTime.getMinutes();
    if (min < 10) {
        min = '0' + min
    }
    let sec = dateTime.getSeconds();
    if (sec < 10) {
        sec = '0' + sec
    }
    let str =
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    return str;
}
function sleep(time) {
    return new Promise((resolve) => { setTimeout(resolve, time) });
}

let fromWei6Andfixed2 = function (val) {
    let num = 0
    if (val) {
        let fromWeiValue = web3.utils.fromWei(val + '', "Mwei")
        num = (fromWeiValue * 1).toFixed(2)
    }
    return num
}
let fromWei18Andfixed2 = function (val) {
    let num = 0
    if (val) {
        let fromWeiValue = web3.utils.fromWei(val + '', "ether")
        num = (fromWeiValue * 1).toFixed(2)
    }
    return num
}
let tools = {
    formatTime, sleep, fromWei6Andfixed2, fromWei18Andfixed2
}
export default tools
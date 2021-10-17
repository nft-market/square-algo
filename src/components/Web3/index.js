const Web3 = require('web3');

const connectWallet = async () => {
  if (window.ethereum) { //check if Metamask is installed
    try {
      const address = await window.ethereum.enable(); //connect Metamask
      console.log(address);
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address[0]);
      console.log(balance);
      const obj = {
        connectedStatus: true,
        status: "",
        address: address[0],
        balance: balance
      }
      return obj;
    } catch (error) {
      console.error(error);
      return {
        connectedStatus: false,
        status: "🦊 Connect to Metamask using the button on the top right."
      }
    }
  } else {
    return {
      connectedStatus: false,
      status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
    }
  }
};

export default {
  connectWallet
};
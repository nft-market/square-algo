import Web3 from 'web3'
import abi from '@/util/contractAbi/abiData'
import contractAddress from '@/util/contractAddress/addressData'

let ethereum = window.ethereum;
let marketContract
let nftContract

if (ethereum){
    let web3 = new Web3(ethereum)

    marketContract = new web3.eth.Contract(abi.marketAbi)
    marketContract.options.address=contractAddress.marketAddr

    nftContract = new web3.eth.Contract(abi.nftAbi)
    nftContract.options.address=contractAddress.nftAddr
}
let contracts = {
    marketContract,
    nftContract
}
export default contracts


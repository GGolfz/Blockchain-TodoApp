import Web3 from 'web3'

let web3
const provider = new Web3.providers.HttpProvider('http://20.184.3.225:8545');
web3 = new Web3(provider)

export default web3

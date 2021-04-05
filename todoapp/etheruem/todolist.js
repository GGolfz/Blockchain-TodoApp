import web3 from './web3'
import TodoList from './build/contracts/TodoList.json';

const instance = new web3.eth.Contract(TodoList.abi,'0x6f5d3F088ca78bA00Be6dcFCF42117842015BF5E')

export default instance
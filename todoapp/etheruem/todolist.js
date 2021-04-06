import web3 from './web3'
import TodoList from './build/contracts/TodoList.json';

const instance = new web3.eth.Contract(TodoList.abi,'0x9D9faDc86b2D0fb3BcB470261EdbeC37361208a5')

export default instance
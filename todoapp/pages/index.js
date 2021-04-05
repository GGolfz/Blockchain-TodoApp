import React, {Fragment,useState,useEffect} from 'react'
import web3 from '../etheruem/web3'
import todoList from '../etheruem/todolist'
const Index = () => {
	const [account,setAccount] = useState('')
	const [content,setContent] = useState('')
	const [tasks,setTasks] = useState([]) 
	useEffect(()=>{ 
		fetchAccount();
		setInterval(()=>{
			fetchData();
		},100)
	},[])
	const fetchAccount = async () => {
		const accounts = await web3.eth.getAccounts()
		setAccount(accounts[0])
		
	}
	

	const fetchData = async () => {
		const taskIds = await todoList.methods.getTaskIds().call()
		const task = await Promise.all(
			taskIds.map(id => {
				return todoList.methods.getTask(id).call()
			})
		)
		const tranformTaskData = task.map(item => {
			return {
				id: item[0],
				date: item[1],
				content: item[2],
				done: item[3]
			}
		})
		setTasks(tranformTaskData);
	}

	const handleSubmit = async ({key}) => {
		if(key != 'Enter' || content == '') return;
		createTask();
	}
	const createTask = async () => {
		let temp = content;
		setContent('');
		await todoList.methods.createTask(temp).send({
			from: account,
			gas: '1000000'
		});
	}
	const toggleTaskStatus = async (id) => {
		await todoList.methods.toggleTaskStatus(id).send({
			from: account,
			gas: "1000000"
		})
	}
	return (
		<Fragment>
			<div>
				<div>To Do App</div>
				<div>
					<input type="text" value={content} onChange={(e)=>setContent(e.target.value)} onKeyDown={handleSubmit}/>
					
				</div>
				<div>
				{
						tasks.map(item => {
							return (
								<p style={{textDecoration: item.done ? 'line-through' : ''}} key={item.id}>{item.content}
								<span><input type="checkbox" checked={item.done} onChange={()=>toggleTaskStatus(item.id)}/></span></p>
							)
						})
					}
				</div>
			</div>
		</Fragment>
	)
}
export default Index;
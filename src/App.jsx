import { useState } from 'react'
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinish, setShowFinish] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }

  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinish = (e) => {
    setShowFinish(!showFinish)
  }



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);

    saveToLS()
  }


  const handleDelete = (e, id) => {


    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);

    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

  }





  return (
    <>
      <Navbar />
      <div className="container bg-cyan-200  mx-auto my-5 rounded-xl p-3 min-h-[80vh] w-[80%]">
        <div className="addTask">

          <h2 className='text-lg font-bold m-2'>Add a Task</h2>
          <div className="flex">
            <input onChange={e => setTodo(e.target.value)} value={todo} type="text" className='w-1/2 text-xl rounded-lg p-2' />
            <button onClick={handleAdd} disabled={todo.length <= 0} className='bg-lime-400 hover:bg-lime-500 disabled:bg-red-500 p-4 text-white font-bold text-xl py-1 rounded-md mx-10 w-20 h-10'>Add</button>

          </div>
        </div>

        <input onChange={toggleFinish} type="checkbox" name="" id="" checked={showFinish} /> Show finish
        <h2 className='text-xl font-bold my-4 mx-2'>Your Tasks:</h2>

        <div className="todos">

          {todos.length === 0 && <div className='my-4 mx-2 text-amber-500 font-bold text-lg'>No Task is available!</div>}
          {todos.map(item => {

            return (showFinish || !item.isCompleted) && <div key={item.id} className="task my-3 flex gap-10 w-[60%] justify-between">
              <div className="flex gap-5 mx-4">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" value={todo.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="button flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-indigo-500 hover:bg-indigo-600 p-2 text-white font-bold text-2xl py-1 w-8 rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-rose-400 hover:bg-rose-600 p-2 text-white font-bold text-2xl py-1 w-8 rounded-md mx-2 '><MdDeleteForever /></button>
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App

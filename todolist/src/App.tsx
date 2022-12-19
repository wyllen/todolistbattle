import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'

function App() {

  const [input, setInput] = useState('');

  const handleAddTask = (e:any) => {
    if(e.code === "Enter" && input !== "" ) {
      setTasks(
        (oldTasks :any) => {
          const updatedTasks =  [...oldTasks];
          updatedTasks.push({
            label: input,
            done: false,
            category: currentCateg
          });
          return updatedTasks;
        }
      )
      setInput("")
    }
  }


  const [inputCategory, setInputCategory] = useState('');
  
  const [categories, setCategories] = useState<string[]>([]);

  const [currentCateg, setcurrentCateg] = useState('');

  const handleAddCategory = (e:any) => {
    if(e.code === "Enter" && inputCategory !== "" ) {
      setCategories(
        (oldCategories :any) => {
          const newCategs = [...oldCategories];
          newCategs.push(inputCategory);
          return newCategs;
        }
      )
      setInputCategory("")
    }
  }


  const initTasks:task[] = [
    {
      label:  "Ma super tache !!!",
      category: "Football",
      done: true,
    },
    {
      label: "Mon autre tache !",
      category: "Football",
      done: false,
    }
  ]
  interface task{
    label: string;
    done:boolean;
    category?: string;
  }
   const [tasks, setTasks] = useState<task[]>(initTasks);

   const handleFinishTask = (taskKey:number) => {
    setTasks(
      (oldTasks :any) => {
        return [...oldTasks].map((task, key) => {
          if (taskKey === key){
            return {
                ...task,
                done: !task.done
              }
          }
          return task
        })
      }
    )
   }

   const handleSelectCateg = (e) => {
    setcurrentCateg(e.target.value) 
   }

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks) )
      localStorage.setItem("categories", JSON.stringify(categories) )
      console.log(JSON.parse(localStorage.getItem("tasks") || ""))
   }, [tasks, categories]);

   useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("tasks") || ""))
    setTasks(JSON.parse(localStorage.getItem("tasks") || ""))
    setCategories(JSON.parse(localStorage.getItem("categories") || ""))
 }, []);

  return (
    <div className="App todolist">
      <div className="todolist__wrapper">
      <div className="todolist__bg">
        <h1>Toolot</h1>
      </div>
      <div className="todolist__tasks">
        <h2>Tasks</h2>
          <div className="todolist__tasks-form">
            <input type="text" className="todolist_form-input" onChange={(e) => setInput(e.target.value)}  value={input} onKeyDown={handleAddTask}/>
            <select onChange={handleSelectCateg}  className="todolist_form-select">
              <option value=""></option>
          {
            categories?.map((categ) =>  <option selected={currentCateg === categ} value={categ}>{categ}</option>)
          }</select>
          </div>
          <div className="todolist__tasks-list">
              {
            tasks.map((task, taskKey) =>  <div className={`todolist__tasks-list-item ${task.done ? "done" :""}`}>{task.label} - {task.category} :  <input  id={"c-"+taskKey}  type="checkbox" checked={task.done} onChange={() => handleFinishTask(taskKey)} /> <label for={"c-"+taskKey} className="todolist__tasks-list-item-check"></label></div>)
          }
          </div>
      </div>
      <div className="todolist__categs">
          <h2>Categories</h2>
          <div className="todolist__categs-form">
            <input type="text" onChange={(e) => setInputCategory(e.target.value)}  value={inputCategory} onKeyDown={handleAddCategory}/>
          </div>
          <div className="todolist__categs-list">{
        categories?.map((categ) =>  <div className="todolist__categs-list-item">{categ}</div>)
      }
          </div>
      </div>
      </div>
  {/*     <div>
        <input type="text" onChange={(e) => setInput(e.target.value)}  value={input} onKeyDown={handleAddTask}/>
        <select onChange={handleSelectCateg}>
          <option value=""></option>
      {
        categories?.map((categ) =>  <option selected={currentCateg === categ} value={categ}>{categ}</option>)
      }</select>
      </div>
      {
        tasks.map((task, taskKey) =>  <div>{task.label} - {task.category} :  <input type="checkbox" checked={task.done} onChange={() => handleFinishTask(taskKey)} /></div>)
      }

      <div className="categories">
        <input type="text" onChange={(e) => setInputCategory(e.target.value)}  value={inputCategory} onKeyDown={handleAddCategory}/>
      {
        categories?.map((categ) =>  <div>{categ}</div>)
      }
      </div> */}
    </div>
  )
}

export default App

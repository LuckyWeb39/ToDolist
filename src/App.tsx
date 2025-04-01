import './App.css'
import {TaskType, ToDoList} from "./TodoList.tsx";
import {useState} from "react";

export type FilterValues = 'All' | 'Completed' | 'Active';



function App() {

   let [tasks, setTask]= useState<TaskType[]>([
       {id: 1, title: "HTML&CSS", isComplete: true},
       {id: 2, title: "JS", isComplete: true},
       {id: 3, title: "React", isComplete: false},
   ])

    let [filter, setFilter] = useState<FilterValues>('All');

    let FilteredTasks = tasks

    if (filter === 'Active') {FilteredTasks = tasks.filter(task => !task.isComplete)}
    if (filter === 'Completed') {FilteredTasks = tasks.filter(task => task.isComplete)}

    const StatusFiltered = (status: FilterValues) => {
        setFilter(status);
    }

    const deleteTask = (id: number) => {
        const deletedTasks = tasks.filter(task => task.id !== id)
        setTask(deletedTasks);
    }

  return (
      <div className="app">
        <ToDoList title={"What to learn"}
                  tasks={FilteredTasks}
                  deleteTask={deleteTask}
                  StatusFiltered={StatusFiltered}/>
      </div>
  )
}

export default App

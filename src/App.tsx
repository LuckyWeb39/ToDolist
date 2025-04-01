import './App.css'
import {TaskType, ToDoList} from "./TodoList.tsx";







function App() {

   const tasks1: TaskType[] = [
    {id: 1, title: "HTML&CSS", isComplete: true},
    {id: 2, title: "JS", isComplete: true},
    {id: 3, title: "React", isComplete: false},
  ]

  return (
      <div className="app">
        <ToDoList title={"What to learn"} tasks={tasks1}/>
      </div>
  )
}

export default App

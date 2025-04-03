import './App.css'
import {TaskType, ToDoList} from "./TodoList.tsx";

function App() {

    const tasks: TaskType[] = [
        {id: 1, title: "HTML5", isComplete: true},
        {id: 2, title: "JS", isComplete: true},
        {id: 3, title: "CSS", isComplete: true},
        {id: 4, title: "React", isComplete: false},
        {id: 5, title: "Redux", isComplete: false},
    ]
  return (
      <div className="app">
        <ToDoList title={"What to learn"}
                  tasks={tasks}/>
      </div>
  )
}

export default App

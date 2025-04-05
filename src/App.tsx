import './App.css'
import {TaskType, ToDoList} from "./TodoList.tsx";
import {v1} from "uuid";

function App() {

    const tasks: TaskType[] = [
        {id: v1(), title: "HTML5", isComplete: true},
        {id: v1(), title: "JS", isComplete: true},
        {id: v1(), title: "CSS", isComplete: true},
        {id: v1(), title: "React", isComplete: false},
        {id: v1(), title: "Redux", isComplete: false},
    ]
  return (
      <div className="app">
        <ToDoList title={"What to learn"}
                  tasks={tasks}/>
      </div>
  )
}

export default App

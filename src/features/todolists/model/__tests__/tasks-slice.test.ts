import {beforeEach, expect, test} from "vitest"
import {createTaskTC, deleteTaskTC, tasksReducer, type TasksState,} from "../tasks-slice.ts"
import {TaskPriority, TaskStatus} from "@/common/enums";
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice.ts";

let startState: TasksState = {}

const taskDefaultValues = {
  description: '',
  deadline: '',
  addedDate: '',
  startDate: '',
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(startState, deleteTaskTC.fulfilled(
      { todolistId: "todolistId2", taskId: "2" },
      'requestId',
      { todolistId: "todolistId2", taskId: "2" }
      )
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {

  const newTask: DomainTask = {
        id: '3',
        title: 'juice',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
      }

  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled(
        {todolistId: "todolistId2", task: newTask},
        'requestId',
        {todolistId: "todolistId2", title: "juice"},
        ),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

// test("correct task should change its status", () => {
//   const endState = tasksReducer(
//       startState,
//       updateTaskTC.fulfilled(
//           {
//             todolistId: "todolistId2",
//             taskId: "2",
//             domainModel: { status: TaskStatus.New } // Изменяем статус
//           },
//           'requestId',
//           {
//             todolistId: "todolistId2",
//             taskId: "2",
//             domainModel: { status: TaskStatus.New }
//           }
//       )
//   )
//   expect(endState.todolistId2[1].status).toBe(TaskStatus.New)
//   expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed)
// })
//
// test("correct task should change its title", () => {
//   const endState = tasksReducer(
//     startState,
//     changeTaskTitleAC({ todolistId: "todolistId2", taskId: "2", title: "coffee" }),
//   )
//
//   expect(endState.todolistId2[1].title).toBe("coffee")
//   expect(endState.todolistId1[1].title).toBe("JS")
// })

test("array should be created for new todolist", () => {
  const title = "New todolist"
  const newTodolist = {
    id: "new-todolist-id",
    title: title,
    addedDate: "",
    order: 0
  };
  const endState = tasksReducer(startState, createTodolistTC.fulfilled(newTodolist,'requestId', title))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistTC.fulfilled(
      { id: "todolistId2" },
      'requestId',
      { id: "todolistId2" }
      )
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

import {Todolist} from "../app/App.tsx";
import {beforeEach, test, expect} from "vitest";
import {v1} from "uuid";
import {
    changeFilterAC, ChangeTitleAC,
    createTodolistAC,
    DeleteTodolistAC,
    todolistsReducer
} from "./TodolistReducer.ts";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let startState: Todolist[]=[]

beforeEach(()=>{
    todolistId1=v1()
    todolistId2=v1()
    todolistId3=v1()

    startState=[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
        {id: todolistId3, title: 'What to play', filter: 'all'},
    ]
})

test('todolist should be deleted', () => {

    const endState = todolistsReducer(startState,DeleteTodolistAC(todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todolistId2)
    expect(endState[1].id).toBe(todolistId3)
})

test('create new todo list', () => {

    const endState = todolistsReducer(startState,createTodolistAC('New Todolist', todolistId1))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to buy')
    expect(endState[2].title).toBe('What to play')
    expect(endState[3].title).toBe('New Todolist')
})
test('change filter status', () => {

    const endState = todolistsReducer(startState,changeFilterAC(todolistId1,'completed'))

    expect(endState.length).toBe(3)
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
    expect(endState[2].filter).toBe('all')
})
test('todolist title should be changed',()=>{

    const endState = todolistsReducer(startState, ChangeTitleAC(todolistId3, 'New Title'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to buy')
    expect(endState[2].title).toBe('New Title')
})
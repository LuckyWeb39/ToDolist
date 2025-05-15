import {beforeEach, expect, test} from "vitest";
import {TasksState} from "../App.tsx";
import {v1} from "uuid";
import {deleteTaskAC, TasksReducer} from "./TasksReducer.ts";

let todolistId1: string
let todolistId2: string
let todolistId3: string
let id1: string
let id2: string
let id3: string
let id4: string
let id5: string
let id6: string
let id7: string
let id8: string
let id9: string
let startState = {}

beforeEach(()=>{
    todolistId1=v1()
    todolistId2=v1()
    todolistId3=v1()
    id1 = v1()
    id2 = v1()
    id3 = v1()
    id4 = v1()
    id5 = v1()
    id6 = v1()
    id7 = v1()
    id8 = v1()
    id9 = v1()

    startState = {
        [todolistId1]: [
            {id1: v1(), title: 'HTML&CSS', isDone: true},
            {id2: v1(), title: 'JS', isDone: true},
            {id3: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id4: v1(), title: 'Beer', isDone: true},
            {id5: v1(), title: 'Meet', isDone: true},
            {id6: v1(), title: 'Bread', isDone: false},
        ],
        [todolistId3]: [
            {id7: v1(), title: 'Dota', isDone: false},
            {id8: v1(), title: 'CS', isDone: false},
            {id9: v1(), title: 'Dendi', isDone: true},
        ],
    }
})


test('tasks should be deleted', () => {

    const endState= TasksReducer(startState, deleteTaskAC(todolistId1,id1))

    expect(endState[todolistId1].length).toBe(2)
})
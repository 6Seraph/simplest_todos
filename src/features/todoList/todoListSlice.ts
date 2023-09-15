import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Todo {
  id: string
  text: string
  active: boolean
}
export type Filter = "all" | "active" | "completed"

export interface TodoListState {
  list: Todo[]
  filter: Filter
}

function getInitialState(): TodoListState {
  const filter = "all"
  const initialState: TodoListState = {
    list: [],
    filter,
  }
  try {
    const localTodoList = localStorage.getItem("todoList")
    return localTodoList !== null
      ? {
          list: JSON.parse(localTodoList),
          filter,
        }
      : initialState
  } catch {
    return initialState
  }
}

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: getInitialState(),
  reducers: {
    add: ({ list }, action: PayloadAction<Todo>) => {
      list.push(action.payload)
    },
    remove: ({ list }, action: PayloadAction<string>) => {
      list.splice(
        list.findIndex(({ id }) => id === action.payload),
        1,
      )
    },
    changeState: (state, action: PayloadAction<string>) => {
      const id = state.list.findIndex(({ id }) => id === action.payload)
      state.list[id].active = !state.list[id].active
    },
    clear: (state) => {
      state.list = state.list.filter((todo) => todo.active)
    },
    toggleFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    },
  },
})

export const { add, remove, changeState, clear, toggleFilter } =
  todoListSlice.actions
export const selectTodoList = (state: RootState) => state.todoList.list
export const selectTodoListFilter = (state: RootState) => state.todoList.filter
export default todoListSlice.reducer

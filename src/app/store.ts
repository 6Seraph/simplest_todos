import { configureStore } from "@reduxjs/toolkit"
import { todoListSlice } from "../features/todoList/"

export const store = configureStore({
  reducer: {
    todoList: todoListSlice.reducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(
    "todoList",
    JSON.stringify(store.getState().todoList.list),
  )
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

import { createSelector } from "@reduxjs/toolkit"
import { Todo, selectTodoList, selectTodoListFilter } from ".."
import { useAppSelector } from "../../../app/hooks"
import { Item } from "."

function createItems(list: Todo[]) {
  return list.map((todo) => <Item key={todo.id}>{todo}</Item>)
}

const selectTodosByFilter = createSelector(
  [selectTodoList, selectTodoListFilter],
  (todos, filter) => {
    switch (filter) {
      case "all":
        return createItems(todos)
      case "active":
        return createItems(todos.filter((todo) => todo.active))
      case "completed":
        return createItems(todos.filter((todo) => !todo.active))
    }
  },
)

function List() {
  const list = useAppSelector(selectTodosByFilter)

  return <ul className="list-group row">{list}</ul>
}

export default List

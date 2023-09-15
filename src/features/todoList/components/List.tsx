import { Todo, selectTodoList, selectTodoListFilter } from ".."
import { useAppSelector } from "../../../app/hooks"
import { Item } from "."

function createItems(list: Todo[]) {
  return list.map((todo) => <Item key={todo.id}>{todo}</Item>)
}

function List() {
  const list = useAppSelector(selectTodoList)
  const filter = useAppSelector(selectTodoListFilter)

  const filteredList: JSX.Element[] = []
  if (filter === "active") {
    filteredList.push(...createItems(list.filter((todo) => todo.active)))
  }
  if (filter === "completed") {
    filteredList.push(...createItems(list.filter((todo) => !todo.active)))
  }

  return (
    <ul className="list-group row">
      {filter === "all" ? createItems(list) : filteredList}
    </ul>
  )
}

export default List

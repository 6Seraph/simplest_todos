import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectTodoList, clear } from ".."
import { Filter } from "."

const clearButtonClass = "btn btn-light btn-sm col-3 focus-ring",
footerClass = "align-items-center border border-top-0 p-1 rounded-bottom-3 row"

function Footer() {
  const dispatch = useAppDispatch()

  const list = useAppSelector(selectTodoList)

  return (
    <footer className={footerClass}>
      <span className="fw-light text-secondary col-3">
        {`${list.reduce(
          (count, todo) => (todo.active ? ++count : count),
          0,
        )} items left`}
      </span>
      <Filter />
      <button
        onClick={() => dispatch(clear())}
        className={clearButtonClass}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

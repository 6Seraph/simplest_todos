import { useAppDispatch } from "../../../app/hooks"
import { Todo, changeState, remove } from ".."

const textClass = "col-10 me-auto pb-1",
  checkboxClass = "col-1 focus-ring form-check-input ms-1 p-0 rounded-5",
  deleteClass = "btn-close col-1 focus-ring",
  liClass =
    "border-top-0 container list-group-item list-group-item-light rounded-0"

function Item({ children }: { children: Todo }) {
  const dispatch = useAppDispatch()
  const { id, text, active } = children

  function eventHandler(actionGen: typeof remove | typeof changeState) {
    return function (e: React.MouseEvent | React.ChangeEvent) {
      e.stopPropagation()
      dispatch(actionGen(id))
    }
  }

  return (
    <li key={id} onClick={eventHandler(changeState)} className={liClass}>
      <div className="row">
        <input type="checkbox" checked={!active} className={checkboxClass} />
        <span
          className={textClass.concat(
            !active ? " text-decoration-line-through text-black-50" : "",
          )}
        >
          {text}
        </span>
        <button onClick={eventHandler(remove)} className={deleteClass} />
      </div>
    </li>
  )
}

export default Item

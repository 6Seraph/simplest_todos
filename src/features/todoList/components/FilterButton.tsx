import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Filter, selectTodoListFilter, toggleFilter } from ".."

interface Props {
  current?: boolean
  value: Filter
}

function FilterButton({ current = false, value }: Props) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectTodoListFilter)

  return (
    <>
      <input
        name="filterButton"
        type="radio"
        value={value}
        id={`${value}Filter`}
        checked={filter === value}
        onChange={() => dispatch(toggleFilter(value))}
        className="btn-check focus-ring"
      />
      <label
        htmlFor={`${value}Filter`}
        className="btn btn-outline-primary btn-sm focus-ring"
      >
        {value}
      </label>
    </>
  )
}

export default FilterButton

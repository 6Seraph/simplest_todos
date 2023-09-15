import { FilterButton } from "."

function Filter() {
  return (
    <div className="btn-group col-6 focus-ring">
      <FilterButton value="all" />
      <FilterButton value="active" />
      <FilterButton value="completed" />
    </div>
  )
}

export default Filter

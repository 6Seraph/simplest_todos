import reducer, {
  add,
  remove,
  changeState,
  clear,
  toggleFilter,
} from "./todoListSlice"

const todo1 = { active: true, id: "1", text: "foo" }
const todo2 = { active: true, id: "2", text: "bar" }
const todo3 = { active: true, id: "3", text: "foobar" }

describe("Store works", () => {
  test("adds todo to store", () => {
    const result = reducer({ list: [], filter: "all" }, add(todo1))
    expect(result.list[0]).toEqual(todo1)
  })

  test("removs todo from store", () => {
    let result = reducer({ list: [], filter: "all" }, add(todo1))
    result = reducer(result, add(todo2))
    result = reducer(result, add(todo3))
    result = reducer(result, remove("2"))
    expect(result.list[0]).toEqual(todo1)
    expect(result.list[1]).toEqual(todo3)
    expect(result.list[2]).toBeUndefined()
  })

  test("changes todo status", () => {
    let result = reducer({ list: [], filter: "all" }, add(todo1))
    result = result = reducer(result, changeState("1"))
    expect(result.list[0].active).toBe(false)
  })

  test("clears list from todos", () => {
    let result = reducer({ list: [], filter: "all" }, add(todo1))
    result = reducer(result, add(todo2))
    result = reducer(result, add(todo3))
    result = reducer(result, changeState("1"))
    result = reducer(result, changeState("3"))
    result = reducer(result, clear())
    expect(result.list[0]).toEqual(todo2)
  })

  test("toggles filter", () => {
    let result = reducer({ list: [], filter: "all" }, toggleFilter("active"))
    expect(result.filter).toBe("active")
    result = reducer(result, toggleFilter("all"))
    expect(result.filter).toBe("all")
    result = reducer(result, toggleFilter("completed"))
    expect(result.filter).toBe("completed")
  })
})

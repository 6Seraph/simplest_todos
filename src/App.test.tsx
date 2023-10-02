import { render, fireEvent, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"

describe("App works", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
  })
  test("adds tasks", () => {
    const input = screen.getByPlaceholderText("What need to be done?")
    for (let i = 1; i <= 3; i++) {
      const name = "new_task_" + i
      fireEvent.change(input, { target: { value: name } })
      fireEvent.keyUp(input, { key: "Enter" })
      expect(screen.getByText(name)).toBeInTheDocument()
    }
    expect(screen.getByText("3 items left")).toBeInTheDocument()
  })

  test("toggles task status", () => {
    const task = screen.getByText("new_task_1")
    const click = (): void => {
      fireEvent.click(task)
    }
    click()
    expect(task).toHaveClass("text-decoration-line-through text-black-50")
    click()
    expect(task).not.toHaveClass("text-decoration-line-through text-black-50")
    click()
  })

  test("removes task", () => {
    const task = screen.getByText("new_task_3")
    const delButton = task.nextElementSibling
    fireEvent.click(delButton!)
    expect(task).not.toBeInTheDocument()
  })

  test("filters tasks", () => {
    const filterActive = screen.getByRole("radio", { name: "active" })
    fireEvent.click(filterActive)
    expect(screen.queryByText("new_task_1")).not.toBeInTheDocument()
    expect(screen.getByText("new_task_2")).toBeInTheDocument()
    const filterCompleted = screen.getByRole("radio", { name: "completed" })
    fireEvent.click(filterCompleted)
    expect(screen.getByText("new_task_1")).toBeInTheDocument()
    expect(screen.queryByText("new_task_2")).not.toBeInTheDocument()
    const filterAll = screen.getByRole("radio", { name: "all" })
    fireEvent.click(filterAll)
    expect(screen.getByText("new_task_1")).toBeInTheDocument()
    expect(screen.getByText("new_task_2")).toBeInTheDocument()
  })
})

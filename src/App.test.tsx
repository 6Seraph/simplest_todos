import { render, fireEvent, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"

test("adds task", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const input = screen.getByPlaceholderText("What need to be done?")
  fireEvent.change(input, { target: { value: "new_task_1" } })
  fireEvent.keyUp(input, { key: "Enter" })
  fireEvent.change(input, { target: { value: "new_task_2" } })
  fireEvent.keyUp(input, { key: "Enter" })
  fireEvent.change(input, { target: { value: "new_task_3" } })
  fireEvent.keyUp(input, { key: "Enter" })
  expect(screen.getByText("new_task_1")).toBeInTheDocument()
  expect(screen.getByText("new_task_2")).toBeInTheDocument()
  expect(screen.getByText("new_task_3")).toBeInTheDocument()
})

test("toggles task status", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const task = screen.getByText("new_task_1")
  fireEvent.click(task)
  expect(task).toHaveClass("text-decoration-line-through text-black-50")
  fireEvent.click(task)
  expect(task).not.toHaveClass("text-decoration-line-through text-black-50")
  fireEvent.click(task)
})

test("removes task", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const task = screen.getByText("new_task_3")
  const delButton = task.nextElementSibling
  fireEvent.click(delButton as Element)
  expect(task).not.toBeInTheDocument()
})

test("filters tasks", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
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

import * as appHooks from "../../../app/hooks"
import { render, fireEvent, screen } from "@testing-library/react"
import * as actions from "../todoListSlice"
import { Item } from "."

vi.mock("../../../app/hooks")

test("Item calls dispatchers", () => {
  const dispatch = vi.fn()
  vi.spyOn(appHooks, "useAppDispatch").mockReturnValue(dispatch)
  const mockedStateChange = vi.spyOn(actions, "changeState")
  const mockedRemove = vi.spyOn(actions, "remove")
  render(<Item>{{ active: true, id: "1", text: "new_task_1" }}</Item>)
  fireEvent.click(screen.getByText("new_task_1"))
  expect(mockedStateChange).toBeCalledWith("1")
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(screen.getByText("new_task_1").nextElementSibling!)
  expect(mockedRemove).toBeCalledWith("1")
  expect(dispatch).toBeCalledTimes(2)
})

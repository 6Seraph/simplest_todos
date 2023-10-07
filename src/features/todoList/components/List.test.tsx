import * as appHooks from "../../../app/hooks"
import { render } from "@testing-library/react"
import { List } from "."

vi.mock("../../../app/hooks")

const todos = [
  { active: true, id: "1", text: "foo" },
  { active: true, id: "2", text: "bar" },
  { active: true, id: "3", text: "foobar" },
]

test("List calls selectors", () => {
  const selector = vi.spyOn(appHooks, "useAppSelector")
  selector.mockResolvedValueOnce(todos).mockResolvedValueOnce("all")
  render(<List />)
  expect(selector).toBeCalledTimes(3)
})

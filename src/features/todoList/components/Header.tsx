import { useState, KeyboardEvent } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { add } from "../"

function idGen() {
  return (
    Date.now().toString().substring(2) +
    Math.random().toString().substring(3, 9)
  )
}

const h1Class = "display-1 fw-light text-center text-secondary",
  inputClass = "focus-ring form-control form-control-lg rounded-bottom-0"

function Header() {
  const [text, changeText] = useState("")
  const dispatch = useAppDispatch()

  function handleSubmit(e: KeyboardEvent) {
    e.preventDefault()
    if (e.key === "Enter" && text !== "") {
      dispatch(add({ id: idGen(), text, active: true }))
      changeText("")
    }
  }

  return (
    <header className="row">
      <h1 className={h1Class}>todos</h1>
      <input
        autoFocus
        value={text}
        name="input todo"
        placeholder="What need to be done?"
        onChange={({ target }) => changeText(target.value)}
        onKeyUp={handleSubmit}
        className={inputClass}
      />
    </header>
  )
}

export default Header

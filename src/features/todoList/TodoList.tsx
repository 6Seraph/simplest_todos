import { Header, List, Footer } from "./components"
import "./focusOverride.css"

function TodoList() {
  return (
    <section className="container-sm">
      <Header />
      <List />
      <Footer />
    </section>
  )
}

export default TodoList

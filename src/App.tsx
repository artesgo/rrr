import { Header, ThemeContext, TodoList, UserContext } from "rrr";
import "./App.css";

function App() {
  return (
    <UserContext
      value={{ name: "jon", email: "snow", authenticated: true, streak: 0 }}
    >
      <ThemeContext value={"dark"}>
        <Header></Header>
        <TodoList
          todo={[
            { id: 1, title: "todo", completed: false },
            { id: 2, title: "todo", completed: true },
          ]}
        ></TodoList>
      </ThemeContext>
    </UserContext>
  );
}

export default App;

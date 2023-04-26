import React, { useCallback, useRef } from "react";
import "./App.css";
import { TodosProvider, useAddTodo, useRemoveTodo, useTodos } from "./useTodos";

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, ...rest }) => (
  <button {...rest}>{title ?? children}</button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();
  // const { todos, addTodo, removeTodo } = useTodos([
  //   { id: 1, text: "TypeScript", done: false },
  // ]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Content</Box>
      <Heading title="Todos:" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
          </>
        )}
      />
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
        </div>
      ))} */}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <TodosProvider initialTodos={[{ id: 1, text: "TypeScript", done: false }]}>
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        <App></App>
        <App></App>
      </div>
    </TodosProvider>
  );
};

export default AppWrapper;

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li
        key={index}
        onClick={() => onClick?.(item)}
        style={{ cursor: "pointer" }}
      >
        {item}
      </li>
    ))}
  </ul>
);

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, ...rest }) => (
  <button {...rest}>{title ?? children}</button>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseValueNumber = ReturnType<typeof useNumber>[0];
type UseSetValueNumber = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
  value: UseValueNumber;
  setValue: UseSetValueNumber;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`}></Button>
);

function App() {
  const onListOnClick = useCallback((item: string) => {
    console.log(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [...state, { id: state.length, text: action.text, done: false }];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);

      default:
        throw new Error();
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  const [value, setValue] = useNumber(0);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Content</Box>
      <List items={["JS", "TS", "React"]} onClick={onListOnClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
      <Heading title="Todos:" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }
          >
            Remove
          </Button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;

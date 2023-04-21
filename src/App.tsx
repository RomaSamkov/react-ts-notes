import React, { useCallback } from "react";
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

function App() {
  const onListOnClick = useCallback((item: string) => {
    console.log(item);
  }, []);
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Content</Box>
      <List items={["JS", "TS", "React"]} onClick={onListOnClick} />
    </div>
  );
}

export default App;

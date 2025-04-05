import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const iRef = useRef<HTMLInputElement | null>(null);

  const clickHandler = () => {
    setCount((count) => count + 1);
    if (!socket || !iRef.current) return null;
    socket.send(iRef.current.value);
  };

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8000");
    setSocket(webSocket);
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={clickHandler}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <input ref={iRef} type="text" />
        <button onClick={clickHandler}>SEND</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

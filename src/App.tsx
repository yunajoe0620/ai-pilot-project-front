import { useState } from "react";
import "./App.css";
import SectionOne from "./section-one";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SectionOne />
    </>
  );
}

export default App;

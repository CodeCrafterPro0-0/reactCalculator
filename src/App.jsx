import { useState } from "react";
import "./index.css";
import CalcButton from "./calcButton.jsx";

export default function App() {
  const [a, setA] = useState("0");
  const [b, setB] = useState("0");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  function handleInput(e, setter) {
    let value = e.target.value;

    if (value === "") {
      setter("");
      return;
    }

    if (!/^[0-9.]*$/.test(value))
      return;

    if ((value.match(/\./g) || []).length >1) return;

    if (
      value.length > 1 && value.startsWith("0") && !value.startsWith("0.")
    ) {
      value = value.replace(/^0+/, "");
    }

    setter(value);
  }

  function handleFocus(e) {
    if (e.target.value === "0") {
      e.target.select();
    }
  }

  function addToHistory(item) {
    setHistory(prev => [...prev, item]);
  }

  function add() {
    const res = Number(a) + Number(b);
    setResult(res);
    addToHistory({type: "add", a, b, result: res});
  }

  function sub() {
    const res = Number(a) - Number(b);
    setResult(res);
    addToHistory({type: "sub", a, b, result: res});
  }

  function mul() {
    const res = Number(a) * Number(b);
    setResult(res);
  addToHistory({type: "mul", a, b, result: res});
  }

  function div() {
    if (Number(b) === 0){
      setResult("Cannot divided by zero"); 
    return;
  }
    const res = Number(a) / Number(b);
    setResult(res);
  addToHistory({type: "div", a, b, result: res});
  }

  function squ() {
    const res = Number(a) ** 2;
    setResult(res);
  addToHistory({type:"squ",a,result: res});
  }

  function power() {
    const res = Number(a) ** Number(b);
    setResult(res);
    addToHistory({type:"power", a, b, result:res});
  }

  function clear() {
    setHistory([]);
  }

  return (
    <div className="app">
      <h2>Simple Calculator</h2>

      <input
        type="text"
        value={a}
        onChange={(e) => handleInput(e, setA)}
        placeholder="First Number"
        onFocus={handleFocus}
      />

      <input 
        type="text"
        value={b}
        onChange={(e) => handleInput(e, setB)}
        placeholder="Second Number"
        onFocus={handleFocus}
      />
    

    <div className="buttons">
        <CalcButton label={"+"} onclick={add} />
        <CalcButton label={"-"} onclick={sub} />
        <CalcButton label={"*"} onclick={mul} />
        <CalcButton label={"/"} onclick={div} />
        <CalcButton label={<span>x<sup>2</sup></span>} onclick={squ} />
        <CalcButton label={<span>x<sup>y</sup></span>} onclick={power} />
    </div>
    <div className="results">
      Result: {result}
    </div>
      <div className="history">
      <h4>History</h4>
      
        <ul>
          {history.map((item, index) => (
          <li key={index}>
              {item.type === "add" && `${item.a} + ${item.b} = ${item.result}`}
              {item.type === "sub" && `${item.a} - ${item.b} = ${item.result}`}
              {item.type === "mul" && `${item.a} * ${item.b} = ${item.result}`}
              {item.type === "div" && `${item.a} / ${item.b} = ${item.result}`}
              {item.type === "squ" && (
                <>
                  {item.a}
                  <sup>2</sup> = {item.result}
                </>
              )}
              {item.type === "power" && (
                <>
                  {item.a}
                  <sup>{item.b}</sup> = {item.result}
                </>
              )}
            </li>
            ))}
        </ul>
        <CalcButton label={"Clear"} onclick={clear} />
      </div>
  </div>
  );
}

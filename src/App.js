import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [valuesDisplayed, setValuesDisplayed] = useState([]);
  const [clearBeforeAddNumber, setclearBeforeAddNumber] = useState(false);

  const numbersList = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const operators = ["+", "-", "*", "/", "%", "="];

  const displayNumber = (value) => {
    let valuesDisplayedCopy = [...valuesDisplayed];
    if (clearBeforeAddNumber) {
      valuesDisplayedCopy = [];
    }
    setValuesDisplayed([...valuesDisplayedCopy, value]);
    setclearBeforeAddNumber(false);
  };
  const calculate = () => {
    const lastValue = valuesDisplayed[valuesDisplayed.length - 1];
    if (isOperator(lastValue)) {
      alert("no valid expression");
      return;
    }
    const result = eval(valuesDisplayed.join(""));
    setValuesDisplayed([result]);
  };
  const isOperator = (value) => {
    return operators.includes(value);
  };

  const addOperator = (operator) => {
    if (operator === "=") {
      calculate();
      setclearBeforeAddNumber(true);
      return;
    }
    // don't add more one operators
    const lastValue = valuesDisplayed[valuesDisplayed.length - 1];
    if (isOperator(lastValue)) return;

    setValuesDisplayed([...valuesDisplayed, operator]);
  };

  const clearAll = () => {
    setValuesDisplayed([0]);
    setclearBeforeAddNumber(true);
  };

  const clearOne = () => {
    const valuesDisplayedCopy = [...valuesDisplayed];
    valuesDisplayedCopy.pop();
    setValuesDisplayed(valuesDisplayedCopy);
    if (valuesDisplayedCopy.length === 0) {
      clearAll();
    }
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="display">{valuesDisplayed.join("")}</div>
      <div>
        <div className="box-numbers">
          {numbersList.map((number, index) => {
            return (
              <button
                key={`number-${index}`}
                onClick={() => displayNumber(number)}
              >
                {number}
              </button>
            );
          })}
        </div>
        {operators.map((operator, index) => {
          return (
            <button
              key={`operator ${index}`}
              type="button"
              onClick={() => addOperator(operator)}
            >
              {operator}
            </button>
          );
        })}
        <div>
          <button type="button" onClick={clearOne}>
            C
          </button>
          <button type="button" onClick={clearAll}>
            CLEAR
          </button>
        </div>
      </div>
      {/* {console.log(eval("29-465.84*2-2"))} */}
    </div>
  );
}

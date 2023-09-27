import { useEffect, useState } from "react";
import "./App.css";
import { Trainer } from "./Perceptron/Trainer";
const XORDataset = {
  inputs: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  outputs: [[0], [1], [1], [0]],
};
const ORDataset = {
  inputs: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  outputs: [[0], [1], [1], [1]],
};
const trainer = new Trainer([2, 3, 6, 1], XORDataset);
function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setTimeout(() => {
      setCount(count + 1);
      updateCount();
      trainer.train(100, 1);
    }, 30);
  };
  useEffect(() => {
    updateCount();
  }, []);
  return (
    <>
    <table >
   {trainer.predictions?.map((item) => {
        return <tr>{item[0].toFixed(4)}</tr>;
      })}

    </table>
   
      <div className="layers">
        {trainer.perceptron.weights?.map((layer) => {
          return (
            <table className="layer">
              {layer.map((i) => (
                <tr>
                  {i.map((j) => {
                    return <td>{j.toFixed(4)}</td>;
                  })}
                </tr>
              ))}
            </table>
          );
        })}
      </div>
    </>
  );
}

export default App;

import { Perceptron } from "./Perceptron";
type DataSet = {
  inputs: number[][];
  outputs: number[][];
};
export class Trainer {
  perceptron: Perceptron;
  predictions?: number[][];
  errors: number[][] = [];
  dataset: DataSet;

  constructor(neuronsByLayers: number[], dataSet: DataSet) {
    this.dataset = dataSet;
    this.perceptron = new Perceptron(neuronsByLayers);
    this.predictions = dataSet.inputs.map((input) => {
      return this.perceptron.predict(input);
    });
    this.errors = this.calculateErrors(this.predictions);
    // console.log(this.errors);
  }
  calculateErrors(predictions: number[][]): number[][] {
    return predictions.map((prediction, index1) => {
      return prediction.map((prediction, index2) => {
        return Math.abs(prediction - this.dataset.outputs[index1][index2]);
      });
    });
  }
  train(cycles = 1000, speed = 0.1) {
    while (cycles--) {
        const duplicate = this.perceptron.duplicate();
        duplicate.mutate(speed);
        const predictions = this.dataset.inputs.map((input) => {
          return duplicate.predict(input);
        });
        const errors = this.calculateErrors(predictions);
        const newError = errors.reduce((acc, error) => {
          return acc + error.reduce((acc, error) => acc + error, 0);
        }, 0);
        const oldError = this.errors.reduce((acc, error) => {
          return acc + error.reduce((acc, error) => acc + error, 0);
        }, 0);
        if (newError < oldError) {
          this.perceptron = duplicate;
          this.predictions = predictions;
          this.errors = errors;
        }
        
    }
    // console.log(this.errors);

    // this.logDataSetOutput();
  }
  //logs the output of the perceptron for each input in the dataset
  //each output is on a new line, but everything is on the same log
  logDataSetOutput() {
    const resultString = this.predictions?.reduce((acc, prediction) => {
      return (acc +=
        prediction.reduce((acc, prediction) => {
          return acc + prediction.toFixed(3) + " ";
        }, "") + "\n");
    }, "");
    console.log(resultString);
  }
}

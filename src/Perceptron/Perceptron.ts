export class Perceptron {
  weights: number[][][];
  neuronsByLayers: number[];
  lastPrediction?: number[];
  constructor(neuronsByLayers: number[]) {
    this.neuronsByLayers = neuronsByLayers;
    this.weights = neuronsByLayers.reduce(
      (acc, currentLayerNeurons, layerIndex, { length }) => {
        if (layerIndex === length - 1) return acc;

        const nextLayerNeurons = neuronsByLayers[layerIndex + 1];
        const layerWeights = this.generateLayerWeights(
          currentLayerNeurons,
          nextLayerNeurons
        );

        return [...acc, layerWeights];
      },
      [] as number[][][]
    );
  }
  static sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
  generateLayerWeights(neurons: number, outputNeurons: number) {
    return Array(neurons)
      .fill(0)
      .map(() => {
        return this.generateRandomWeights(outputNeurons);
      });
  }

  generateRandomWeights(outputNeurons: number) {
    return Array(outputNeurons)
      .fill(0)
      .map(() => Math.random());
  }

  getSynapse(layerIndex: number, neuronIndex: number, nextNeuronIndex: number) {
    return this.weights[layerIndex][neuronIndex][nextNeuronIndex];
  }
  getNeuronSynapses(layerIndex: number, neuronIndex: number) {
    return this.weights[layerIndex][neuronIndex];
  }
  predict(input: number[], layerIndex = 0): number[] {
    const layerOutput = new Array(this.neuronsByLayers[layerIndex + 1])
      .fill(0)
      .map((_, neuronIndex) => {
        const inputSum = input.reduce((acc, input, inputIndex) => {
          const synapse = this.getSynapse(layerIndex, inputIndex, neuronIndex);
          return acc + input * synapse;
        }, 0);
        return Perceptron.sigmoid(inputSum);
      });
    if (layerIndex === this.neuronsByLayers.length - 2) {
      this.lastPrediction = layerOutput;
      return layerOutput;
    }

    return this.predict(layerOutput, layerIndex + 1);
  }
  logOutput() {
    console.log(
      this.lastPrediction?.map((prediction) => prediction.toFixed(3))
    );
  }
  mutate(speed = 0.0001) {
    this.weights = this.weights.map((layer) => {
      return layer.map((neuron) => {
        return neuron.map((synapse) => {
          const random = Math.random() - 0.5;
          if (random < -0.1) return synapse + Math.random() * speed;
          if (random > 0.1) return synapse - Math.random() * speed;

          return synapse;
        });
      });
    });
  }
  //make a copy of the perceptron
  duplicate() {
    const newPerceptron = new Perceptron(this.neuronsByLayers);
    newPerceptron.weights = this.weights.map((layer) => {
      return layer.map((neuron) => {
        return neuron.map((synapse) => {
          return synapse;
        });
      });
    });
    return newPerceptron;
  }
  //duplicate
  //mutate
}

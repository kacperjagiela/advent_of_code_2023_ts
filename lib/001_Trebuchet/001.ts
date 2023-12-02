import fs from "fs";

const input = fs.readFileSync("../inputs/001_input.txt", "utf8");

const lines = input.trim().split("\n");

const numbers: number[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const letters = line.split("");
  let firstNumber: number;
  let secondNumber: number;

  for (let j = 0; j < letters.length; j++) {
    if (Number.isInteger(parseInt(letters[j]))) {
      firstNumber = parseInt(letters[j]);
      break;
    }
  }

  for (let j = letters.length - 1; j >= 0; j--) {
    if (Number.isInteger(parseInt(letters[j]))) {
      secondNumber = parseInt(letters[j]);
      break;
    }
  }

  numbers.push(parseInt(`${firstNumber}${secondNumber}`));
}

numbers.forEach((number, index) => console.log(index, number));

const sum = numbers.reduce((a, b) => a + b, 0);

console.log(sum);

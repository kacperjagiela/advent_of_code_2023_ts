import fs from "fs";

const determine_nearest_number = (line: string) => {
  let nearest = "";
  let nearest_index = line.length;

  for (let i = 0; i < numbers_as_strings.length; i++) {
    const index = line.indexOf(numbers_as_strings[i]);

    if (index !== -1 && index < nearest_index) {
      nearest = numbers_as_strings[i];
      nearest_index = line.indexOf(numbers_as_strings[i]);

      console.log(
        line.indexOf(numbers_as_strings[i]),
        nearest_index,
        numbers_as_strings[i]
      );
    }
  }

  return nearest;
};

const numbers_as_string: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const input = fs.readFileSync("../inputs/001_input.txt", "utf8");

let lines = input.trim().split("\n");

const LINES = input.trim().split("\n");

// Get nearest number string and replace it with the number
const numbers_as_strings = Object.keys(numbers_as_string);

for (let i = 0; i < lines.length; i++) {
  let nearest_number = determine_nearest_number(lines[i]);

  console.log("nearest_number", nearest_number);
  while (nearest_number !== "") {
    if (numbers_as_string[nearest_number]) {
      lines[i] = lines[i].replace(
        nearest_number.slice(0, nearest_number.length - 1),
        numbers_as_string[nearest_number].toString()
      );
    }
    nearest_number = determine_nearest_number(lines[i]);
  }
}

const numbers: number[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const letters = line.split("");
  let first_number: number;
  let second_number: number;

  for (let j = 0; j < letters.length; j++) {
    if (Number.isInteger(parseInt(letters[j]))) {
      first_number = parseInt(letters[j]);
      break;
    }
  }

  for (let j = letters.length - 1; j >= 0; j--) {
    if (Number.isInteger(parseInt(letters[j]))) {
      second_number = parseInt(letters[j]);
      break;
    }
  }

  numbers.push(parseInt(`${first_number}${second_number}`));

  console.log(
    `Line ${i + 1}:  `,
    parseInt(`${first_number}${second_number}`),
    `         ${lines[i]} "    |    " ${LINES[i]}`
  );
}

//numbers.forEach((number, index) => console.log(index, number));

const sum = numbers.reduce((a, b) => a + b, 0);

console.log(sum);

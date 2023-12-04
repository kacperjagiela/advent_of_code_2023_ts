import fs from "fs";

type MatchingObj = {
  line: number;
  num_index: number;
  matching_string: string;
};

const NUMBERS: number[] = new Array(10).fill(0).map((_, i) => i);

const validate_char = (char: string) => {
  if (Number.isNaN(parseInt(char, 10)) && char !== ".") {
    return true;
  }
  return false;
};

// index = 3
//
// ["3", "5", "."]
// i=0, i=1, i=2
//

const find_numbers_in_line = (
  line: string,
  index: number
): { match: string; index: number }[] => {
  return line
    .slice(index - 1, index + 2)
    .split("")
    .map((char, i) => {
      if (NUMBERS.includes(Number(char))) {
        const new_index = -1;
        return { match: char, index: index + (new_index + i) };
      }
    })
    .filter((a) => !!a);
};

// .4675.

const find_full_number_in_line = (
  num: number,
  num_index: number,
  line: string
) => {
  const stop_symbols = [...symbols, "."];
  const number_arr = [num];
  let can_search_left = true;
  let can_search_right = true;

  if (num_index === 0) {
    can_search_left = false;
  }

  if (num_index === line.length - 1) {
    can_search_right = false;
  }

  // Find left and right side

  let iteration = 1;

  while (can_search_left || can_search_right) {
    if (can_search_left) {
      const char = line[num_index - iteration];

      if (stop_symbols.includes(line[num_index - iteration]) || !char) {
        can_search_left = false;
      } else {
        const num = Number(char);

        number_arr.unshift(num);
      }
    }

    if (can_search_right) {
      const char = line[num_index + iteration];

      if (stop_symbols.includes(line[num_index + iteration]) || !char) {
        can_search_right = false;
      } else {
        const num = Number(char);

        number_arr.push(num);
      }
    }

    iteration += 1;
  }

  return number_arr.join("");
};

const find_adjusting_numbers = (
  symbol_index: number,
  curr_line_index: number,
  curr_line: string,
  prev_line?: string,
  next_line?: string
) => {
  const curr_line_check = find_numbers_in_line(curr_line, symbol_index);

  if (curr_line_check.length) {
    curr_line_check.forEach((obj) => {
      matching_numbers.push({
        line: curr_line_index,
        num_index: obj.index,
        matching_string: obj.match,
      });
    });
  }

  if (prev_line) {
    const prev_line_check = find_numbers_in_line(prev_line, symbol_index);

    if (prev_line_check.length) {
      prev_line_check.forEach((obj) => {
        matching_numbers.push({
          line: curr_line_index - 1,
          num_index: obj.index,
          matching_string: obj.match,
        });
      });
    }
  }
  if (next_line) {
    const next_line_check = find_numbers_in_line(next_line, symbol_index);

    if (next_line_check.length) {
      next_line_check.forEach((obj) => {
        matching_numbers.push({
          line: curr_line_index + 1,
          num_index: obj.index,
          matching_string: obj.match,
        });
      });
    }
  }
};

const file = fs.readFileSync("../inputs/003_input.txt", "utf8");

const lines = file.trim().replace(/\r/g, "").split("\n");

const symbols: Set<string> = new Set();

const matching_numbers: MatchingObj[] = [];

// Get all symbols
lines.map((line) =>
  line.split("").forEach((char) => {
    if (validate_char(char)) {
      symbols.add(char);
    }
  })
);

for (let i = 0; i < lines.length; i++) {
  const curr_line: string = lines[i];
  const prev_line: string = lines[i - 1];
  const next_line: string = lines[i + 1];

  curr_line.split("").forEach((char, char_index) => {
    if (symbols.has(char)) {
      console.log("char: ", char);
      find_adjusting_numbers(char_index, i, curr_line, prev_line, next_line);
    }
  });
}

// Remove adjusting numbers

let matching_numbers_curated: MatchingObj[] = [];

console.log(matching_numbers);

for (let i = 0; i < lines.length; i++) {
  const to_clean = matching_numbers.filter((obj) => obj.line === i);

  if (!to_clean.length) {
    continue;
  }

  console.log("to_clean", to_clean);
  const return_arr = [...to_clean];

  for (let j = 0; j < to_clean.length; j++) {
    console.log("return_arr", return_arr);
    //{ line: 0, num_index: 38, matching_string: '8' },
    const index = to_clean[j].num_index;

    console.log("j: ", j);
    console.log("index", index);

    if (to_clean[j + 1] && to_clean[j + 1].num_index === index + 1) {
      console.log(to_clean[j + 1].num_index === index + 1);
      return_arr.splice(
        return_arr.findIndex((item) => item.num_index === index),
        1
      );
    }
  }

  matching_numbers_curated.push(...return_arr);
}

console.log("matching_numbers_curated: ", matching_numbers_curated);

// Find full numbers instead of one char numbers
const numbers: string[] = matching_numbers_curated.map((obj) => {
  return find_full_number_in_line(
    Number(obj.matching_string),
    obj.num_index,
    lines[obj.line]
  );
});

const sum: number = numbers.reduce((a, b) => Number(a) + Number(b), 0);

console.log(numbers);
console.log(sum);

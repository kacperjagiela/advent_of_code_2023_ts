import fs from "fs";

const file = fs.readFileSync("../inputs/004_input.txt", "utf8");

const lines = file
  .trim()
  .replace(/\r/g, "")
  .replace(/Card \d+: /g, "")
  .split("\n");

const split_lines = lines.map((line) => line.split(" | "));

const calculate_points = (matches: number): number => {
  let index = 1;
  let points = 1;

  while (index < matches) {
    points *= 2;
    index += 1;
  }

  return points;
};

let points = 0;

split_lines.forEach(([winning, to_check]) => {
  const winning_arr = winning.split(" ").map((v) => Number(v));
  const check_arr = to_check.split(" ").map((v) => Number(v));
  let matches = 0;

  winning_arr.forEach((num) => {
    if (check_arr.includes(num) && num > 0) {
      console.log(num);
      matches += 1;
    }
  });

  if (matches > 0) {
    points += calculate_points(matches);
  }
});

console.log(points);

import fs from "fs";

type CubeObject = {
  red: number;
  green: number;
  blue: number;
};

type GameObject = Record<number, CubeObject>;

//only 12 red cubes, 13 green cubes, and 14 blue cubes

const max_cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const file = fs.readFileSync("../inputs/002_input.txt", "utf8");

const lines = file.trim().replace(/\r/g, "").split("\n");

console.log(lines);

const games_obj: GameObject = {};

//regex to match the cube colors
const game_regex = /Game [1-9]\d*: /;

lines.forEach((line) => {
  const [game_with_number, ...rest] = line.match(game_regex);

  const [_, num] = game_with_number.replace(": ", "").split(" ");

  const games_obj_key = parseInt(num, 10);

  games_obj[games_obj_key] = {
    red: 0,
    green: 0,
    blue: 0,
  };
});

// Remove game identifier from lines

const game_lines = lines.map((line) => line.replace(game_regex, ""));

const game_lines_split = game_lines.map((line) => line.split("; "));

console.log("game_lines_split: ", game_lines_split);

game_lines_split.forEach((game, game_index) => {
  console.log("game", game);
  game.forEach((line) => {
    // ["12 red", "13 green", "14 blue"]
    const split = line.split(",").map((item) => item.trim());

    split.forEach((item) => {
      const [number, color] = item.split(" ");

      const color_name = color.replace(",", "");

      console.log(number, color_name);

      const color_key = color_name as keyof CubeObject;

      const new_num = parseInt(number, 10);

      const current_num = games_obj[game_index + 1][color_key];

      if (new_num >= current_num) {
        games_obj[game_index + 1][color_key] = new_num;
      }
    });
  });
});

// validate games_obj

const valid_games: number[] = [];

Object.entries(games_obj).forEach(([game_id, game_obj]) => {
  const { red, green, blue } = game_obj;

  if (
    red <= max_cubes.red &&
    green <= max_cubes.green &&
    blue <= max_cubes.blue
  ) {
    valid_games.push(parseInt(game_id, 10));
  }
});

console.log(valid_games.reduce((a, b) => a + b, 0));

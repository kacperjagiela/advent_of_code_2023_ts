import fs from "fs";

type Card = {
  original_index: number;
  card: string[];
};

type ScratchCard = Card & {
  matches: number;
  count: number;
};

const file = fs.readFileSync("../inputs/004_input.txt", "utf8");

const lines = file
  .trim()
  .replace(/\r/g, "")
  .replace(/Card \d+: /g, "")
  .split("\n");

const original_lines = lines.map((line) => line.split(" | "));

const CARDS: Card[] = original_lines.map((line, index) => ({
  original_index: index,
  card: line,
}));

const cards = [...CARDS];

const scratch_cards: ScratchCard[] = [];

for (let i = 0; i < cards.length; i++) {
  const winning_arr = cards[i].card[0].split(" ").map((v) => Number(v));
  const check_arr = cards[i].card[1].split(" ").map((v) => Number(v));

  let matches = 0;

  winning_arr.forEach((num) => {
    if (check_arr.includes(num) && num > 0) {
      matches += 1;
    }
  });

  scratch_cards.push({ ...cards[i], count: 1, matches });
}

for (let i = 0; i < scratch_cards.length; i++) {
  const card = scratch_cards[i];

  for (let j = 0; j < card.count; j++) {
    for (
      let k = card.original_index + 1;
      k <= card.original_index + card.matches;
      k++
    ) {
      //  console.log("k:", k);

      scratch_cards[k].count += 1;
    }
  }
}

const sum = scratch_cards.reduce((a, b) => a + b.count, 0);

console.log("cards: ", sum);

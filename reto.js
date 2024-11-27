function resolveCombination(initialCombination, moves) {
  let digits = initialCombination.split("").map(Number);
  let position = 0;

  for (let move of moves) {
    switch (move) {
      case "R":
        position = (position + 1) % digits.length;
        break;
      case "L":
        position = (position - 1 + digits.length) % digits.length;
        break;
      case "U":
        digits[position] = (digits[position] + 1) % 10;
        break;
      case "D":
        digits[position] = (digits[position] - 1 + 10) % 10;
        break;
    }
  }
  return digits.join("");
}

console.log(resolveCombination("000", "URURD"));
console.log(
  resolveCombination("528934712834", "URDURUDRUDLLLLUUDDUDUDUDLLRRRR")
);

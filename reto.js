const fs = require("fs");

function calcSteps(instructions) {
  let position = 0;
  let steps = 0;

  while (position >= 0 && position < instructions.length) {
    const jump = instructions[position];
    instructions[position]++;
    position += jump;
    steps++;
  }
  return steps;
}

fs.readFile("trace.txt", "utf8", (err, data) => {
  if (err) return console.log("Error al leer el archivo");

  const lines = data.split("\n");
  let totalSteps = 0;
  let lastLineSteps = 0;

  lines.forEach((line) => {
    const instructions = line.split(" ").map(Number);
    const steps = calcSteps(instructions);
    totalSteps += steps;
    lastLineSteps = steps;
  });

  console.log(`submit: ${totalSteps}-${lastLineSteps}`);
});

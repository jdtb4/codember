const fs = require("fs");
function isValidPassword(password) {
  let hasLetters = false;
  let lastChar = "";
  let lastDigit = -1;

  for (let char of password) {
    if (/[0-9]/.test(char)) {
      if (hasLetters) return false;
      let digit = Number(char);
      if (digit < lastDigit) return false;
      lastDigit = digit;
    } else if (/[a-z]/.test(char)) {
      hasLetters = true;
      if (char < lastChar) return false;
      lastChar = char;
    } else {
      return false;
    }
  }
  return true;
}

function main(filePath) {
  const data = readFileSync(filePath, "utf8");
  const passwords = data.split("\n");
  let validPasswords = 0;
  let invalidCount = 0;

  passwords.forEach((password) =>
    isValidPassword(password) ? validPasswords++ : invalidCount++
  );
  console.log(`submit ${validPasswords}true${invalidCount}false`);
}

main("log.txt");

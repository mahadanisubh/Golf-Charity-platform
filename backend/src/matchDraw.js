export const generateWinningNumbers = (mode = "random") => {
  // FIXED MODE (for demo)
  if (mode === "fixed") {
    return [10, 20, 30, 40, 15];
  }

  // RANDOM MODE (default)
  const numbers = new Set();

  while (numbers.size < 5) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  return Array.from(numbers);
};

export const countMatches = (userScores, winningNumbers) => {
  return userScores.filter((num) =>
    winningNumbers.includes(num)
  ).length;
};
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function simulateGame(): number {
  const squares: (string | null)[] = Array(9).fill(null);
  let xIsNext = true;
  let steps = 0;
  let winner = null;

  while (!winner) {
    // Choose a random index from 0 to 8
    const randomIndex = Math.floor(Math.random() * 9);

    // Always place the current player's mark, overwriting if necessary
    squares[randomIndex] = xIsNext ? "X" : "O";

    steps++;
    xIsNext = !xIsNext;
    winner = calculateWinner(squares);
  }

  return steps;
}

function main() {
  const numSimulations = 10_000_000; // 100 million will take about 2 minutes to run
  const stepsDistribution: number[] = [];
  for (let i = 0; i < numSimulations; i++) {
    const steps = simulateGame();
    stepsDistribution.push(steps);
  }

  // Calculate the distribution
  const counts: { [steps: number]: number } = {};
  for (const steps of stepsDistribution) {
    counts[steps] = (counts[steps] || 0) + 1;
  }

  // Output the distribution
  console.log("Steps Distribution (Number of Steps: Frequency):");
  const sortedSteps = Object.keys(counts)
    .map(Number)
    .sort((a, b) => a - b);
  for (const steps of sortedSteps) {
    console.log(`Steps: ${steps}, Frequency: ${counts[steps]}`);
  }

  // Calculate and print average steps
  const totalSteps = stepsDistribution.reduce((sum, steps) => sum + steps, 0);
  const averageSteps = totalSteps / numSimulations;
  console.log(`Average number of steps: ${averageSteps.toFixed(5)}`);
}

main();

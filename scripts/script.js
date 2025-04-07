let scores = JSON.parse(localStorage.getItem('scores')) || {
  win: 0,
  loses: 0,
  ties: 0,
};

function resetScores() {
  const confirmReset = confirm('Are you sure you want to reset the scores?');
  if (!confirmReset) return;

  // Clear scores in localStorage
  localStorage.removeItem('scores');

  // Reset the scores object
  scores.win = 0;
  scores.loses = 0;
  scores.ties = 0;

  // Update the scores display immediately
  document.querySelector('.scores').innerHTML = `
    Wins: ${scores.win}, Losses: ${scores.loses}, Ties: ${scores.ties}
  `;

  // Clear the result and moves display
  document.querySelector('.result').innerHTML = '';
  document.querySelector('.selected-moves').innerHTML = '';
}

function getPlayerMove(playerMove) {
  const computer = getComputerMove();
  let result = '';
  let emoji = '';

  // Show countdown animation
  document.querySelector('.result').innerHTML = `
    <span class="result-text">Rock... Paper... Scissors...</span>
  `;

  setTimeout(() => {
    // Determine the result
    if (playerMove === 'rock') {
      if (computer === 'rock') {
        result = "It's a tie";
        emoji = '🤝';
      } else if (computer === 'scissors') {
        result = 'You win';
        emoji = '🎉';
      } else if (computer === 'paper') {
        result = 'You lose';
        emoji = '😢';
      }
    } else if (playerMove === 'scissors') {
      if (computer === 'rock') {
        result = 'You lose';
        emoji = '😢';
      } else if (computer === 'scissors') {
        result = "It's a tie";
        emoji = '🤝';
      } else if (computer === 'paper') {
        result = 'You win';
        emoji = '🎉';
      }
    } else if (playerMove === 'paper') {
      if (computer === 'rock') {
        result = 'You win';
        emoji = '🎉';
      } else if (computer === 'scissors') {
        result = 'You lose';
        emoji = '😢';
      } else if (computer === 'paper') {
        result = "It's a tie";
        emoji = '🤝';
      }
    }

    if (result === 'You win') {
      scores.win++;
    } else if (result === 'You lose') {
      scores.loses++;
    } else if (result === "It's a tie") {
      scores.ties++;
    }

    localStorage.setItem('scores', JSON.stringify(scores));

    // Update the scores display
    document.querySelector('.scores').innerHTML = `
      Wins: ${scores.win}, Losses: ${scores.loses}, Ties: ${scores.ties}
    `;

    // Display the selected moves
    document.querySelector('.selected-moves').innerHTML = `
      You picked: <img src="images/${playerMove}.jpg" class="move" alt="${playerMove}">
      Computer picked: <img src="images/${computer}.jpg" class="move" alt="${computer}">
    `;

    // Display the result with emoji
    document.querySelector('.result').innerHTML = `
      <span class="result-text">${result} ${emoji}</span>
    `;

    // Add animation to the result
    const resultText = document.querySelector('.result-text');
    resultText.classList.add('animate-result');
    setTimeout(() => resultText.classList.remove('animate-result'), 1000);
  }, 1500); // 1.5-second countdown
}

function getComputerMove() {
  const generateNumber = Math.floor(Math.random() * 3);
  return ['rock', 'paper', 'scissors'][generateNumber];
}
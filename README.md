Tic-Tac-Toe Game


A classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript. This web application allows users to play against another human or a computer opponent with varying levels of difficulty. It features a clean, modern, and responsive interface.

Features


Game Modes: Choose to play against another person on the same device or against a bot.

Bot Difficulty Levels: The AI opponent has three settings:

Easy: The bot makes random moves.

Medium: The bot will try to win if it can, and block the player from winning if necessary. Otherwise, it moves randomly.

Impossible: The bot uses the minimax algorithm to play a perfect game, making it impossible to defeat (you can only win or draw).

Responsive Design: The game is fully playable on desktop, tablet, and mobile devices.

Clear UI: The interface clearly indicates whose turn it is, the result of the game (win/draw), and highlights the winning line.

Interactive Setup: A simple menu to select the game mode and difficulty before starting.

File Structure


The project is organized into three separate files for better maintainability:

index.html: Contains the HTML structure of the game, including the game board and control buttons.

style.css: Provides the custom styles for the game elements, player markers, and winning animations. It works alongside Tailwind CSS.

script.js: Includes all the game logic, such as handling player moves, checking for wins/draws, and the AI for the bot opponent.

How to Run the Game


Download the files: Make sure you have index.html, style.css, and script.js.

Place them together: Put all three files in the same folder or directory.

Open in Browser: Open the index.html file in any modern web browser (like Chrome, Firefox, or Edge).

The game will load, and you can start playing immediately.

How to Play


Choose Opponent: On the main screen, select whether you want to play against a "Human" or a "Bot".

Select Difficulty (if playing vs. Bot): If you chose "Vs. Bot", three difficulty options will appear. Click on "Easy", "Medium", or "Impossible".

Start Playing: The game board will appear. Player 1 is 'X' and Player 2 (or the Bot) is 'O'. Player 'X' always goes first.

Take Turns: Click on any empty square on the grid to place your marker.

Winning the Game: The first player to get three of their markers in a row (horizontally, vertically, or diagonally) wins the round.

New Game: After a game ends (in a win or a draw), click the "New Game" button to go back to the main menu and start a new match.

Technologies Used


HTML5

CSS3

Tailwind CSS: For utility-first styling and layout.

JavaScript (ES6+): For all game logic and interactivity.

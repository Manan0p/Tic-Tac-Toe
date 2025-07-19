#  Tic-Tac-Toe Game 🕹️

A classic Tic-Tac-Toe game built with modern web technologies. This application allows users to play against another human or a challenging AI opponent with multiple difficulty levels. It features a clean, responsive, and intuitive interface.

---

## 🚀 Features

* **🎮 Dual Game Modes**: Choose to play against another person on the same device or against a sophisticated bot.
* **🤖 Multiple Bot Difficulties**: The AI opponent comes with three distinct settings:
    * **Easy**: The bot makes random, unpredictable moves.
    * **Medium**: The bot plays defensively, blocking player wins while looking for its own opportunities.
    * **Impossible**: The bot uses the minimax algorithm to play a perfect game, making it impossible to defeat (you can only win or draw).
* **📱 Responsive Design**: The game is fully optimized for a seamless experience on desktop, tablet, and mobile devices.
* **🎨 Clear & Modern UI**: The interface clearly indicates the current player's turn, the game's outcome (win/draw), and highlights the winning combination of cells.
* **⚙️ Interactive Setup**: A simple and user-friendly menu to select the game mode and difficulty before each match.

---

## 📂 File Structure

The project is organized into three separate files for better readability and maintainability:

* `index.html`: Contains the HTML structure for the game board, setup screen, and control buttons.
* `style.css`: Provides the custom styles for game elements, player markers (`X` and `O`), and winning animations. It works in conjunction with Tailwind CSS.
* `script.js`: Houses all the game logic, including handling player moves, checking for wins/draws, and the AI algorithms for the bot opponent.

---

## 🛠️ How to Run Locally

1.  **Clone the repository** (or download the files):
    ```bash
    git clone [https://github.com/your-github-username/your-repo-name.git](https://github.com/your-github-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd your-repo-name
    ```
3.  **Open in Browser**: Open the `index.html` file in any modern web browser (like Chrome, Firefox, or Edge).

The game will load, and you can start playing immediately.

---

## 룰 How to Play

1.  **Choose Your Opponent**: On the main screen, select whether you want to play against a "Human" or a "Bot".
2.  **Select Difficulty** (if playing vs. Bot): If you chose "Vs. Bot", three difficulty options will appear. Click on "Easy", "Medium", or "Impossible".
3.  **Start Playing**: The game board will appear. Player 1 is 'X' and Player 2 (or the Bot) is 'O'. Player 'X' always goes first.
4.  **Take Turns**: Click on any empty square on the grid to place your marker.
5.  **Win the Game**: The first player to get three of their markers in a row (horizontally, vertically, or diagonally) wins the round.
6.  **New Game**: After a game ends, click the "New Game" button to return to the main menu and start a new match.

---

## 💻 Technologies Used

* **HTML5**
* **CSS3**
    * **Tailwind CSS**: For utility-first styling and rapid UI development.
* **JavaScript (ES6+)**: For all game logic, interactivity, and AI implementation.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

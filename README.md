# BOOP GAME

Once upon a time, there was a princess in Nowhereland who really loved kittens. One day the kittens of the royal court sneaked into the beautiful young maiden's bedroom and started playing with each other on the princess' comfortable mattress. Her bed was very flexible, which created another problem: the jumping kittens kept bumping into each other and pushing their furry little playmates.

##Task
Your task is to create a simplified version of the board game Boop as a browser-based application written in native JavaScript. To understand the task, you may take a look at the rule book of the original game (https://www.smirkandlaughter.com/_files/ugd/693f33_5cd5b748ac194385a4fac5fb168076e7.pdf) — just don't forget to add the scoring system and ignore the special rules about (big) cats.

- The game board consists of a 6x6 grid of square cells.
- The game is played by two players against each other, who take turns placing kittens on the field. The kittens of the two players must be different, e.g. in their colour or pattern.
- The players have 8 kittens each, which are initially placed on the bench outside the game board.
- Placing a new kitten on the board pushes the kittens (regardless of whether the kitten is yours or the oppenent's) in all adjacent cells one cell away from the location of the placement. (See image below!)
- There is only one case when the kitten is not pushed away — if in the cell where it would arrive is already taken by another kitten.
- The kittens on the edge of the board are also pushed away — they fall off the board and return to the bench of the player who placed them.
- The goal of the game is to have three kittens of the same color (belonging to the same player) next to each other horizontally, vertically or diagonally after the pushing finishes. In this case, the player gets one point, and the three kittens are returned to their bench. (Attention! It is also possible that after pushing, three of the opponent's kittens land next to each other — in this case, the point goes to the opponent!)
- The game can finish in two ways:
  - If any player reaches a specified target score. In this case this player is the winner.
  - If any player has all their kittens on the field at the same time. In this case, this player automatically loses, as they cannot play any move.

## Mandatory tasks (must be completed, 8 pts)
- Other: the README.md file from the "Purity of the submitted work" section is included and properly filled in (0 pts)
- Game: the empty board and 8 kittens per player appear (1 pt)
- Game: the two players alternately place a kitten on the board from their own bench (1 pt)
- Game: a new kitten can only be placed on an empty cell (1 pt)
- Game: after placing a new kitten, adjacent kittens are pushed away correctly — this includes that kittens pushed off the board are returned to the corresponding player's bench (2 pts)
- Game: the game detects when three kittens are adjacent in any direction — this includes that the three kittens are returned to the bench and the points are counted (2 pts)
- Game: the game ends when any player reaches 5 points (1 pt)

##Basic tasks (12 pts)
- Game: the game ends when a player has all their kittens on the field at the same time (1 pt)
- Game: before placing the kittens, the game indicates (e.g. by changing the background colour of the cells) which kittens will be pushed away (1 pt)
- Game: kittens can also be placed by dragging and dropping them from the bench to the board (2 pts)
- Game: the pushing of the kittens is animated (1 pt)
- Starting screen: the name of the players and the number of points required to win can be entered before starting the game (1 pt)
- Starting screen: the board's dimensions (e.g. 7x7) and the number of kittens per player can be set (1 pt)
- Starting screen: the most recent games are displayed — players, date and time, final result (1 pt)
- Starting screen: the results of recent games will remain even after closing the page (1 pt)
- Game: when the game ends, a new game with the same settings can be started with a single button press without reloading the page (1 pt)
- Meowing: activities (e.g. starting a game, placing a kitten, pushing, earning a point) have sound effects (1 pt)
- Other: nice appearance and code organisation (1 pt)
- **Late submission: -0,5 pts / started day!**

##Extra tasks (additional 5 pts)
- Saving: by clicking a button during the game, the current state can be permanently saved, and can later be loaded and continued from the starting screen (2 pts)
- Timer: each player has a timer with 2 minutes of thinking time, which counts down while waiting for the given player's move (like a chess clock) — the player who runs out of thinking time automatically loses (3 pts)

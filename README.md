# Newton Runner project description

As Part of the bachelor practical course "Designing IT-based Learning" at the Technical University of Munich, Germany our group decided to design a web-based learning game for physics lessons. The goal of this game was to teach the basics of movement, with a focus on time-place and time-velocity-diagrams.

The game consists of two levels (as well as a small bonus level) and three central elements: Theory, Quizzes and Quests. Each level begins with a theory explaining the relevant knowledge for the level and a short quiz to verify that the knowledge was understood. After that, the player can consolidate their knowledge in multiple quests as well as an additional quiz. The goal of those two levels is to introduce the player intuitively to the basics of movement and how different types of diagrams model it.

As a central element in our games, the quests allow the player to navigate a Jump ’n’ Run like game, using the before mentioned diagram types to control their player.

At the end of this course, we then evaluated this game with different classes in multiple lessons and wrote an evaluation based on the data and feedback we collected.

The Game can be found at [newton-runner.de](https://newton-runner.de/).<br>
Please note that logging in or sending any feedback wont work since the backend has stopped.

# Team

Our Team consisted of Alexander Liebald, Niclas Hülsmann, Sandra Graßnick and Philipp Rappolder.

# Backend

To collect feedback, calculate the leaderboard and save the progress of users, we build an backend which can be found here: [link](https://github.com/nhuels/newton-runner-backend)

# Setup

For development setup, see [SETUP.md](https://github.com/aliebald/newton-runner/blob/main/SETUP.md).

# Current state of the Game

Since the practical course ended, development is currently not continuing. The backend server is also no longer running, so logging in or sending feedback wont work.

Some parts of the code had to be produced with high time pressure and optimization was not always possible or the main goal. Nevertheless, no major bugs are known.

## Known Bugs

-   Starting a Quest and then changing the page to another quest does not stop the previous quest, which can lead to problems. Reloading the page or simply finishing/ending a quest before changing page solves the bug.

# Contact

For bug reports or other project related topics, feel free to create an issue on [GitHub](https://github.com/aliebald/newton-runner/issues).

For other inquiries, please contact us via mail: `physics.game.team (at) gmail.com`.

# Credits for used assets

-   Kenney Game Assets (version 41) by [kenney.nl](https://kenney.nl/), [kenney.itch.io](https://kenney.itch.io/kenney-game-assets-1).
-   Hiker/Adventurer Sprites by The Baldur [the-baldur.itch.io](https://the-baldur.itch.io).

# License

Note that assets used in this project are licensed independently.

    Newton Runner is a gamified teaching approach for the basics of movement by graphs
    Copyright (C) 2021 Alexander Liebald, Niclas Huelsmann, Sandra Graßnick, Philipp Rappolder

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

To collect feedback, calculate the leaderboard and save the progress of users, we build an backend which can be found here: **TODO LINK**

# Setup

For development setup, see [SETUP.md](https://github.com/aliebald/newton-runner/blob/main/SETUP.md).

# Current state of the Game

Since the practical course ended, development is currently not continuing. The backend server is also no longer running, so logging in or sending feedback wont work!

Some parts of the code had to be produced with high time pressure and optimization was not always possible or the main goal. Nevertheless, no major bugs are known.

## Known Bugs

-   Starting a Quest and then changing the page to another quest does not stop the previous quest, which can lead to problems. Reloading the page or simply finishing/ending a quest before changing page solves the bug.

# Credits for used assets

-   Kenney Game Assets (version 41) [link](https://kenney.itch.io/kenney-game-assets-1).
-   Hiker/Adventurer Sprites by The Baldur [link](https://the-baldur.itch.io/pixelart-hiker).

# License

It is planned to release Newton Runner with an open source license, but currently this repository does not yet include a license. If a license is added in the future, the licensed version will be found [on GitHub](https://github.com/aliebald/newton-runner).

Please note that any use of this code, other than the evaluation of our project at the chair of Information Systems and Business Process Management, is therefore currently prohibited. You may however play the game [play the game](https://newton-runner.de) in its current version.

We will do our best to provide a open source license as soon as possible. Feel free to contact us regarding any requests or proposals regarding this matter.

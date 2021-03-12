# Development Setup

The following setup is for development only.

## Prerequisites

-   VS Code
-   Node.js. To check if Node.js is installed, use `node -v`.

## Install dependencies

Run `npm install` to setup the project.

## Install VS Code plugins

Look for `ESLint` and `Prettier - Code formatter` under Extensions in Vscode and install them.

Optionally, a spell checker (e.g. `Code Spell Checker`) can be installed.

## Necessary settings

For development, please change the following settings in Visual Studio Code:

-   Look for `Default Formatter` and set it to `esbenp.prettier-vscode`
-   Look for `formatOnSave` and check the checkbox
-   Look for `Eol` and set it to `lf` or `\n`

<br>

# Further Notes

## Running a local development server

A local development server can be started using `npm start`. The application will be opened in a new browser tab, which will refresh every time changes are saved.

Compiler errors will be shown in the terminal and in the browser. For minor errors please also check the browser console.

## File structure

-   **src** and **public**: [see create-react-app description](https://create-react-app.dev/docs/folder-structure/)
-   **src/css**: global css (`styles.css`) and component specific css (`style.`_`component`_`.css`)
-   **src/components**: React Components
-   **src/\_\_tests\_\_**: Continuous integration tests
-   **src/levels**: config files for quests, quizzes and theory components, further sorted into subdirectories for each level

## Naming conventions

-   React Components, Types & Interfaces: **PascalCase**
-   Everything else: **camelCase**

## Debug Logger

To activate debug output, put `localStorage.logger = "debug"` into the console of your browser.

To deactivate debug output, use `localStorage.removeItem("logger")`.

Please use the logger (src/logger.ts) for all debug output. The Logger provides the functions `log`, `warn` and `error`, which forward their arguments to to console.xy if `localStorage.logger === "debug"`.

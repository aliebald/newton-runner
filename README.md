# ITBL Physics Game

This repository contains a project for the course IT Based Learning at TUM.

This is very much still work in progress.

<br/>

# Development Setup

## Prerequisites

You need to have Node.js installed.
To check if Node.js is installed, use `node -v`.

<br/>

## Install dependencies

Run `npm install` to setup the project.

<br/>

## Install Vscode plugins

Look for `ESLint` and `Prettier - Code formatter` under Extensions in Vscode and install them.

Optionally, a spell checker (e.g. `Code Spell Checker`) can be installed.

<br/>

## Necessary settings

For development, please change the following settings in Visual Studio Code:

-   Look for `Default Formatter` and set it to `esbenp.prettier-vscode`
-   Look for `formatOnSave` and check the checkbox
-   Look for `Eol` and set it to `lf` or `\n`

<br/>

# Running a local development server

A local development server can be started using `npm start`. The application will be opened in a new browser tab, which will refresh every time changes are saved.

Major errors will be shown in the terminal and in the browser. For minor errors please also check the browser console.

<br/>

# File structure

-   **src** and **public**: [see this](https://create-react-app.dev/docs/folder-structure/)

-   **src/css**: global css

    -   This should be the preferred place for css, to keep the style the same over all levels and quests.

-   **src/components**: global components. This is where you should put new components. If necessary we can later move them into subdirectories of levels

-   **src/\_\_tests\_\_**: this contains all tests

-   **src/levels**: contains all levels

-   **src/levels/exampleLevels**: contains all quests for the _exampleLevels_ level

    -   Each quest has one .ts file, exporting a QuestConfig constant (see Quest component).

<br>

# Naming conventions

-   React Components, Types & Interfaces: _UpperCamelCase_
-   Everything else: _lowerCamelCase_

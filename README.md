# Path2Finding Visualizer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## A Pathfinding Algorithm Visualization Tool

Path2Finding is a pathfinding algorithm visualizer that focuses on teaching the user how pathfinding algorithm work. It allows the user to modify the maze, change the algorithm, and see how each of them perform. We also offer quick information about each algorithm to try and give a deeper understanding of the logic behind them.

## Features

- Start/stop the visualization
- Select an algorithm (BFS, DFS, A\*, Dijkstra's)
- Set a visualization speed (x0.5, x1, x1.5, x2)
- Change the grid size (minimum 20 x 20)
- Move start and end points
- Randomize wall placement
- Place/remove walls
- Clear the grid
- Save and load a maze
- View information about each algorithm

## Getting Started

### Setup

1. Install [Node.js](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/docs/install)

2. Clone this repository to your local computer and install its dependencies

   ```bash
   > git clone https://github.com/path2finding/visualizer.git
   > cd visualizer
   > yarn
   ```

### Run

1. From the root project directory, start the application

   ```bash
   > yarn start
   ```

2. A browser window should open once started but if not you can access it here: [http://localhost:3000/](http://localhost:3000/)

## Demo Video

https://youtu.be/6Yoa2gQcspA

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:ci`

Launches the test runner in the ci mode which prevents them from hanging on watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running with Docker

### `docker build -t path2finding-visualizer .`

Builds the React UI in production production and assembles a docker image to host the build using Nginx.

### `docker run -p 80:80 -d path2finding-visualizer`

Runs the Nginx server hosting the React UI on port 80. Access the running server at http://localhost

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://uptonm.dev/"><img src="https://avatars3.githubusercontent.com/u/23084678?v=4" width="100px;" alt=""/><br /><sub><b>Mike Upton</b></sub></a><br /><a href="https://github.com/path2finding/visualizer/commits?author=uptonm" title="Code">💻</a> <a href="#infra-uptonm" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/ShawnToubeau"><img src="https://avatars1.githubusercontent.com/u/22332636?v=4" width="100px;" alt=""/><br /><sub><b>Shawn Toubeau</b></sub></a><br /><a href="https://github.com/path2finding/visualizer/commits?author=ShawnToubeau" title="Code">💻</a> <a href="#infra-ShawnToubeau" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-ShawnToubeau" title="Design">🎨</a> <a href="https://github.com/path2finding/visualizer/commits?author=ShawnToubeau" title="Documentation">📖</a></td>
    <td align="center"><a href="http://jame.dev"><img src="https://avatars2.githubusercontent.com/u/21059291?v=4" width="100px;" alt=""/><br /><sub><b>Jame Coyne</b></sub></a><br /><a href="https://github.com/path2finding/visualizer/commits?author=JamesCoyne" title="Code">💻</a> <a href="#design-JamesCoyne" title="Design">🎨</a> <a href="https://github.com/path2finding/visualizer/commits?author=JamesCoyne" title="Documentation">📖</a> <a href="#infra-JamesCoyne" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/gordenstein72"><img src="https://avatars1.githubusercontent.com/u/33324346?v=4" width="100px;" alt=""/><br /><sub><b>Harry Gordenstein</b></sub></a><br /><a href="https://github.com/path2finding/visualizer/commits?author=gordenstein72" title="Code">💻</a> <a href="#infra-gordenstein72" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/path2finding/visualizer/commits?author=gordenstein72" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

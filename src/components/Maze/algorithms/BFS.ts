import { Coord, MazeInfo } from "../../../models/maze";

// export const bfs = (bfsQueue: Coord[], isPlaying: boolean, start: Coord, mazeInfo: MazeInfo, handlePauseVisualization: () => void, getValidNeighbors: (coord: Coord, mazeInfo: MazeInfo) => Coord[] | Coord, progressBFS: (
//   queue: Coord[],
//   coord: Coord,
//   neighbors: Coord[] | Coord
// ) => void) => {
//   let queue = bfsQueue;
//     // This gets run once at the start
//     if (isPlaying && queue.length === 0) {
//       console.log("Init BFS");
//       // const start = getStart(mazeInfo);
//       console.log("Start BFS");
//       if (start) {
//         queue.push(start);
//       }
//     }

//     setTimeout(function () {
//       if (queue.length > 0 && isPlaying) {
//         console.log("Going through BFS", queue);

//         // Removes any queued spaces that were previously visited
//         while (mazeInfo[queue[0].y][queue[0].x].visited) {
//           queue.shift();

//           // If we end up removing the last space we end BFS
//           if (queue.length === 0) {
//             handlePauseVisualization();
//             return;
//           }
//         }

//         const curr = queue[0];
//         const currNeighbors = getValidNeighbors(curr, mazeInfo);

//         // If currNeighbors is an array then we keep going.
//         // If it's a single object then we've found our end
//         if (Array.isArray(currNeighbors)) {
//           // Add neighbors to queue
//           queue = queue.concat(currNeighbors);
//           // Dequeue curr
//           queue.shift();
//           // Update bfsQueue and set curr to visited
//           progressBFS(queue, curr, currNeighbors);
//         } else {
//           handlePauseVisualization();
//           progressBFS([], curr, currNeighbors);
//         }
//       }
// })}

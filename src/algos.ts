//used for information pop up
export default {
  a: " ### A* Info\
    \nA* pronounced A-Star was originally created in an attempt to create a general purpose robot as part of the Shakey\
     project in the 1960’s and 70’s. A* is a best-first search algorithm.\
     \n### Runtime: \
    \nThe time complexity is polynomial when the search space is a tree, there is a single goal state,\
     and the heuristic function h meets the following condition:\
    \n| h ( x ) − h ∗ ( x ) | = O ( log ⁡ h ∗ ( x ) ) \
    \nwhere h* is the optimal heuristic, the exact cost to get from x to the goal.\
    \n### Helpful links:\
    \n[The Coding Train (video part1)] (https://www.youtube.com/watch?v=aKYlikFAV4k&t=968s) \
    \n[Computerphile (video)] (https://www.youtube.com/watch?v=ySN5Wnu88nE )",

  BFS: "### BFS Info\
    \nBreadth-First Search is a graph or tree traversing algorithm that looks at all nodes at the current level \
    before moving onto the next deepest set of nodes. It was created by Konrad Zuse in 1945 and later reinvented by Edward F. Moore in 1959. \
    \n### Runtime:\
    \nO( | V | + | E |) where V is the number of nodes and E the number of edges.\
    \n### Helpful links: \
    \n[TheHippieCat (video)] (https://www.youtube.com/watch?v=WvR9voi0y2I)\
    \n[Nesbox (README)] (https://github.com/nesbox/TIC-80/wiki/Pathfinding%EA%9E%89-BFS-Algorithm)",

  DFS: "### DFS Info\
    \nDepth-first search is a pathfinding or tree spanning algorithm that follows one branch to its deepest point before backtracking. \
    It was created in the 19th century by French mathematician Charles Pierre Trémaux. \
    \n### Runtime:\
    \nO( | V | + | E |) where V is the number of nodes and E the number of edges.\
    \n### Helpful links:\
    \n[Brilliant (articel)] (https://brilliant.org/wiki/depth-first-search-dfs)\
    \n[Go GATE IIT (video)](https://www.youtube.com/watch?v=iaBEKo5sM7w)",

  Djikstras: "### Djikstra's Algorithm Info\
        \nDjikstra's shortest path first Algorithm is a pathfinding algorithm created by Edsger W. Djikstra in 1956. \
        It uses a min-priority queue to find the shortest path of a weighted graph. \
        \n### Runtime: \
        \n(Min-priority queue) O(| V | +| E |log| V |) (where | V | s the number of nodes and | E | is the number of edges)\
        \n(Array) O(V^2)\
        \n### Helpful links:\
        \n[Computerphile (video)](https://www.youtube.com/watch?v=GazC3A4OQTE)\
        \n[Clément Mihailescu (video)] (https://www.youtube.com/watch?v=msttfIHHkak&t=2826s)",
};

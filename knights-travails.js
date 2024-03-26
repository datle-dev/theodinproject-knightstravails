import Queue from './queue.js';
import Node from './node.js';

const Board = (function() {
    let adjacency = {};
    let nodes = {};
    const gridSize = 7;

    const initAdjacency = () => {
        const possibleMoves = [
            { x: 1, y: 2 },
            { x: 1, y: -2 },
            { x: -1, y: 2 },
            { x: -1, y: -2 },
            { x: 2, y: 1 },
            { x: 2, y: -1 },
            { x: -2, y: 1 },
            { x: -2, y: -1 },
        ];

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let allowedMoves = []
                possibleMoves.forEach((move) => {
                    let xCoord = i + move.x;
                    let yCoord = j + move.y;
                    if (
                        xCoord >= 0
                        && xCoord <= gridSize - 1
                        && yCoord >= 0
                        && yCoord <= gridSize - 1
                    ) {
                        allowedMoves.push(String(xCoord) + String(yCoord));
                    }
                })
                adjacency[String(i) + String(j)] = allowedMoves;
            }
        }
    };

    const initNodes = () => {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                nodes[String(i) + String(j)] = Node(String(i) + String(j));
            }
        }
    };

    const getAdjacency = () => {
        return adjacency;
    };

    const getNodes = () => {
        return nodes;
    };

    const knightMoves = (start, end) => {
        let queue = Queue();
        let idStart = idFromCoords(start);
        let idEnd = idFromCoords(end);
        let idCurrent;
        let isEndReached = false;
        let shortestPath = [];

        console.log(`knightMoves([${start}], [${end}]) --> `)

        queue.enqueue(idStart);

        while (!isEndReached) {
            idCurrent = queue.dequeue();
            
            if (idCurrent == idEnd) {
                isEndReached = true;
                shortestPath.unshift(idEnd);
                let currentParent = nodes[idEnd].getParent();
                while (currentParent != null) {
                    shortestPath.unshift(currentParent);
                    currentParent = nodes[currentParent].getParent();
                }
                break;
            }

            adjacency[idCurrent].forEach((move) => {
                if (nodes[move].isVisited() || nodes[move].isQueued()) {
                    return;
                } else {
                    queue.enqueue(move);
                    nodes[move].markQueued();
                    nodes[move].setParent(idCurrent);
                }
            });

            nodes[idCurrent].markVisited();
        }

        cleanUpNodes();
        shortestPath = shortestPath.map((node) => [Number(node[0]), Number(node[1])]);
        console.log(shortestPath);
        return shortestPath;

    };

    const cleanUpNodes = () => {
        for (const [id, node] of Object.entries(nodes)) {
            node.reset();
        }
    };

    const idFromCoords = (arr) => {
        return String(arr[0]) + String(arr[1]);
    };

    initAdjacency();
    initNodes();

    return {
        getAdjacency,
        getNodes,
        knightMoves,
    }

})();

// console.log(Board.getNodes());
Board.knightMoves([0, 0], [1, 1]);
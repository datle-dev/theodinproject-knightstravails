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
        let idCurrent = idFromCoords(start);
        let idEnd = idFromCoords(end);
        let isEndReached = false;

        queue.enqueue(idCurrent);

        while (!isEndReached) {
            if (idCurrent == idEnd) {
                isEndReached = true;
                let currentParent = nodes[idEnd].getParent();
                while (currentParent != null) {
                    currentParent = nodes[currentParent].getParent();
                }
                break;
            }

            if (nodes[idCurrent].isVisited()) {
                idCurrent = queue.dequeue();
            }

            nodes[idCurrent].markVisited();

            adjacency[idCurrent].forEach((move) => {
                if (nodes[move].isVisited()) {
                    return;
                } else {
                    queue.enqueue(move);
                    nodes[move].setParent(idCurrent);
                }
            });

            idCurrent = queue.dequeue();
        }
    };

    const idFromCoords = (arr) => {
        return String(arr[0]) + String(arr[1]);
    }

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
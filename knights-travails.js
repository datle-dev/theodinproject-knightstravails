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
        console.log(`[${start}] to [${end}]`)
        let queue = Queue();
        let idCurrent = idFromCoords(start);
        let idEnd = idFromCoords(end);
        let isEndReached = false;

        queue.enqueue(idCurrent);
        // console.log('initial queue')
        // queue.print();

        let count = 0;

        while (!isEndReached) {
            count++;
            // console.log(`>>> idCurrent: ${idCurrent}`);
            if (idCurrent == idEnd) {
                console.log('end found')
                isEndReached = true;
                let currentParent = nodes[idEnd].getParent();
                console.log(`idEnd: ${idEnd}`);
                console.log(`${idEnd}'s parent: ${nodes[idCurrent].getParent()}`);
                while (currentParent != null) {
                    console.log(`${currentParent}'s parent: ${nodes[currentParent].getParent()}`)
                    currentParent = nodes[currentParent].getParent();
                }
                // console.log('path back traced');
                console.log(`count=${count}`)
                break;
            }

            if (nodes[idCurrent].isVisited()) {
                // console.log('already visited, skipping');
                idCurrent = queue.dequeue();
                // console.log('queue')
                // queue.print();
            }

            // console.log(`marking ${idCurrent} as visited...`)
            nodes[idCurrent].markVisited();
            // console.log(`node ${idCurrent} visited? ${nodes[idCurrent].isVisited()}`);

            adjacency[idCurrent].forEach((move) => {
                // console.log(`move: ${nodes[move].id}`)
                if (nodes[move].isVisited()) {
                    // console.log(`${move} already visited, skipping...`)
                    return;
                } else {
                    // console.log(`enqueueing ${move}`);
                    queue.enqueue(move);
                    nodes[move].setParent(idCurrent);
                }
            });

            idCurrent = queue.dequeue();
            // console.log('queue')
            // queue.print();
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
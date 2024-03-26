export default function Node (id) {
    let parent = null;
    let visited = false;
    let queued = false;

    const setParent = (idParent) => {
        parent = idParent;
    };

    const getParent = () => {
        return parent;
    };

    const markVisited = () => {
        visited = true;
    };

    const isVisited = () => {
        return visited;
    };

    const markQueued = () => {
        queued = true;
    };

    const isQueued = () => {
        return queued;
    };

    const reset = () => {
        parent = null;
        visited = false;
        queued = false;
    }

    return {
        id,
        setParent,
        getParent,
        markVisited,
        isVisited,
        markQueued,
        isQueued,
        reset,
    };
};
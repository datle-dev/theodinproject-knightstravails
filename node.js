export default function Node (id) {
    let parent = null;
    let visited = false;

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

    return {
        id,
        setParent,
        getParent,
        markVisited,
        isVisited,
    }
};
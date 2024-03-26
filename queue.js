const Queue = () => {
    let arr = [];

    const enqueue = (value) => {
        arr.push(value);
    };

    const dequeue = () => {
        return arr.shift();
    };

    const print = () => {
        console.log(arr);
    };

    return {
        enqueue,
        dequeue,
        print,
    };
};

export default Queue;
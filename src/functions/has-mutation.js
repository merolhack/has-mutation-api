const hasMutation = function (dnaSequence) {
    // Convert the single dimensional Array to multidimensional array
    const dnaMultiArray = dnaSequence.map((item) => Object.keys(item).sort().map((key) => item[key]));
    // Only these four letters are available to check if is mutant
    const secA = new Array(4).fill('A').join();
    const secC = new Array(4).fill('C').join();
    const secG = new Array(4).fill('G').join();
    const secT = new Array(4).fill('T').join();
    // Count the number of occurrences
    let occurenceCounter = 0;
    // Check horizontally
    for (i = 0; i < dnaMultiArray.length; i++) {
        for (j = 0; j <= dnaSequence[i].length - 4; j++) {
            let dnaHorizontal = [];
            for (k = 0; k < 4; k++) {
                dnaHorizontal.push(dnaSequence[i][j + k]);
            }
            const dataJoined = dnaHorizontal.join();
            if (dataJoined === secA || dataJoined === secC || dataJoined === secG || dataJoined === secT) {
                occurenceCounter++;
            }
        }
    }
    // Check vertically
    for (i = 0; i < dnaSequence[0].length; i++) {
        for (j = 0; j <= dnaMultiArray.length - 4; j++) {
            let dnaVertical = [];
            for (k = 0; k < 4; k++) {
                dnaVertical.push(dnaSequence[j + k][i]);
            }
            const dataJoined = dnaVertical.join();
            if (dataJoined === secA || dataJoined === secC || dataJoined === secG || dataJoined === secT) {
                occurenceCounter++;
            }
        }
    }
    // Check diagonally
    for (i = 0; i <= dnaMultiArray.length - 4; i++) {
        for (j = 0; j <= dnaSequence[i].length - 4; j++) {
            let dnaDiagonally = [];
            for (k = 0; k < 4; k++) {
                dnaDiagonally.push(dnaSequence[i + k][j + k]);
            }
            const dataJoined = dnaDiagonally.join();
            if (dataJoined === secA || dataJoined === secC || dataJoined === secG || dataJoined === secT) {
                occurenceCounter++;
            }
        }
    }
    // Check reverse diagonal
    for (i = 0; i <= dnaMultiArray.length - 4; i++) {
        for (j = dnaSequence[i].length - 1; j >= 0 + 4 - 1; j--) {
            let dnaReverseDiagonal = [];
            for (k = 0; k < 4; k++) {
                dnaReverseDiagonal.push(dnaSequence[i + k][j - k]);
            }
            const dataJoined = dnaReverseDiagonal.join();
            if (dataJoined === secA || dataJoined === secC || dataJoined === secG || dataJoined === secT) {
                occurenceCounter++;
            }
        }
    }
    return (occurenceCounter >= 2) ? true : false;
};

module.exports = hasMutation;

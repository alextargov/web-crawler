const matrix1 = [
    [1, 2, 3,],
    [4, 5, 6,],
];

const matrix2 = [
    [1, 2, 3],
    [4, 5, 6]
];

const resultMatrix = [
    [0, 0, 0],
    [0, 0, 0]
];

for (let row = 0; row < matrix1.length; row += 1) {
    for (let col = 0; col < matrix1[0].length; col += 1) {
        const val = matrix1[row][col];
        resultMatrix[row][col] += val;
    }
}

for (let row = 0; row < matrix2.length; row += 1) {
    for (let col = 0; col < matrix2[0].length; col += 1) {
        const val = matrix2[row][col];
        resultMatrix[row][col] += val;
    }
}

console.log(resultMatrix);
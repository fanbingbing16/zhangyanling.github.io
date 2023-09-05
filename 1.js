/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {

    if (grid[0][0] !== 0 || grid.slice(-1)[0].slice(-1)[0] !== 0) return -1
    if (grid.length === 2) return 2
    let num = 1
    let i = 0
    let j = 0
    let has = new Set()
    console.log(grid, 'grid')
    while (i < grid.length - 1 && j < grid.length - 1) {

        if (grid[i + 1][j + 1] === 0 && !has.has((i + 1) * grid.length + j + 1)) {
            num++
            i++
            j++
            has.add((i + 1) * grid.length + j + 1)
        } else if (grid[i + 1][j] === 0 && !has.has((i + 1) * grid.length + j)) {
            num++
            i++
            has.add((i + 1) * grid.length + j)

        } else if (grid[i][j + 1] === 0 && !has.has(i * grid.length + 1 + j)) {
            num++
            j++
            has.add(i * grid.length + 1 + j)
        } else if (grid[i][j - 1] === 0 && !has.has(i * grid.length + j - 1)) {
            num++
            j--
            has.add(i * grid.length + j - 1)
        }
        else if (grid[i - 1][j] === 0 && !has.has((i - 1) * grid.length + j)) {
            num++
            i--
            has.add((i - 1) * grid.length + j)

        } else if (grid[i - 1][j - 1] === 0 && !has.has((i - 1) * grid.length + j - 1)) {
            num++
            j--
            i--
            has.add((i - 1) * grid.length + j - 1)
        } else if (grid[i - 1][j + 1] === 0 && !has.has((i - 1) * grid.length + 1 + j)) {
            num++
            j++
            i--
            has.add((i - 1) * grid.length + 1 + j)
        } else if (grid[i + 1][j - 1] === 0 && !has.has((i + 1) * grid.length - 1 + j)) {
            num++
            j++
            i--
            has.add((i + 1) * grid.length - 1 + j)
        }
        else {
            num = -1
            i = grid.length
            j = grid.length
        }
    }
    console.log(i, j, grid.length)
    if ((i === grid.length - 2 && j === grid.length - 1) || (i === grid.length - 2 && j === grid.length - 2) || (i === grid.length - 1 && j === grid.length - 2)) num++
    return num
};
console.log(shortestPathBinaryMatrix([
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0]
]))
export const generateRandomPuzzleHooks = (piecesConvexity, i, j) => {
    piecesConvexity[j][i] = {}
    piecesConvexity[j][i].right = Math.floor(Math.random() * 2) !== 0
    piecesConvexity[j][i].down = Math.floor(Math.random() * 2) !== 0
    if (j > 0) piecesConvexity[j][i].up = !piecesConvexity[j - 1][i].down
    if (i > 0) piecesConvexity[j][i].left = !piecesConvexity[j][i - 1].right
}

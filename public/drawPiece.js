import createjs from "https://zimjs.org/cdn/1.3.4/createjs_module"

const ONE_EIGHTH_PIECE_WIDTH = 20
const ONE_EIGHTH_PIECE_HEIGHT = 19

export const drawPieceEdges = (imageObj, pieceConvexity, context, pieceRowNumber, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    context.setStrokeStyle(3, "round")
    // eslint-disable-next-line no-unused-expressions
    context.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).command
    // eslint-disable-next-line no-unused-expressions
    context.beginBitmapFill(imageObj.image).command
    context.moveTo(pieceOffsetX, pieceOffsetY)

    drawUpperEdge(pieceConvexity.up, context, pieceRowNumber, pieceOffsetX, pieceOffsetY)
    drawRightEdge(pieceConvexity.right, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY)
    drawLowerEdge(pieceConvexity.down, context, pieceRowNumber, pieceOffsetX, pieceOffsetY)
    drawLeftEdge(pieceConvexity.left, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY)
}

const drawUpperEdge = (isConvex, context, pieceRowNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceRowNumber !== 0) {
        context.lineTo(pieceOffsetX + 3 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        const hookPeakX = pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH
        const hookPeakY = isConvex
            ? pieceOffsetY - 2 * ONE_EIGHTH_PIECE_HEIGHT
            : pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT
        const hookLeftStartX = pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH
        const hookRightStartY = pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH
        if (isConvex) {
            context.curveTo(hookLeftStartX, hookPeakY, hookPeakX, hookPeakY)
            context.curveTo(hookRightStartY, hookPeakY, pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        } else {
            context.curveTo(hookLeftStartX, hookPeakY, hookPeakX, hookPeakY)
            context.curveTo(hookRightStartY, hookPeakY, pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        }
    }
    context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
}

const drawRightEdge = (isConvex, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceColumnNumber !== 4) {
        context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 3 * ONE_EIGHTH_PIECE_HEIGHT)
        const hookPeakX = isConvex
            ? pieceOffsetX + 10 * ONE_EIGHTH_PIECE_WIDTH
            : pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH
        const hookPeakY = pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT
        const hookUpperStartY = pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT
        const hookLowerStartY = pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT
        context.curveTo(hookPeakX, hookUpperStartY, hookPeakX, hookPeakY)
        context.curveTo(hookPeakX, hookLowerStartY, pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 5 * ONE_EIGHTH_PIECE_HEIGHT)
    }
    context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
}

const drawLowerEdge = (isConvex, context, pieceRowNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceRowNumber !== 3) {
        context.lineTo(pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)  // from right to left
        const hookPeakX = pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH
        const hookPeakY = isConvex
            ? pieceOffsetY + 10 * ONE_EIGHTH_PIECE_HEIGHT
            : pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT
        const hookLeftStartX = pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH
        const hookRightStartX = pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH
        context.curveTo(hookRightStartX, hookPeakY, hookPeakX, hookPeakY)
        context.curveTo(hookLeftStartX, hookPeakY, pieceOffsetX + 3 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
    }
    context.lineTo(pieceOffsetX, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
}

const drawLeftEdge = (isConvex, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceColumnNumber !== 0) {
        context.lineTo(pieceOffsetX, pieceOffsetY + 5 * ONE_EIGHTH_PIECE_HEIGHT)  // from down to up
        const hookPeakX = isConvex
            ? pieceOffsetX - 2 * ONE_EIGHTH_PIECE_WIDTH
            : pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH
        const hookPeakY = pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT
        const hookUpperStartY = pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT
        const hookLowerStartY = pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT
        context.curveTo(hookPeakX, hookUpperStartY, hookPeakX, hookPeakY)
        context.curveTo(hookPeakX, hookLowerStartY, pieceOffsetX, pieceOffsetY + 3 * ONE_EIGHTH_PIECE_HEIGHT)
    }
    context.lineTo(pieceOffsetX, pieceOffsetY)
}

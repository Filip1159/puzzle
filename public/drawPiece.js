import createjs from "https://zimjs.org/cdn/1.3.4/createjs_module"

const ONE_EIGHTH_PIECE_WIDTH = 20
const ONE_EIGHTH_PIECE_HEIGHT = 19

export const drawPieceEdges = (imageObj, tileObj, context, pieceRowNumber, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    context.setStrokeStyle(3, "round")
    // eslint-disable-next-line no-unused-expressions
    context.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).command
    // eslint-disable-next-line no-unused-expressions
    context.beginBitmapFill(imageObj.image).command
    context.moveTo(pieceOffsetX, pieceOffsetY)

    drawUpperEdge(tileObj, context, pieceRowNumber, pieceOffsetX, pieceOffsetY)
    drawRightEdge(tileObj, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY)
    drawLowerEdge(tileObj, context, pieceRowNumber, pieceOffsetX, pieceOffsetY)
    drawLeftEdge(tileObj, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY)
}

const drawUpperEdge = (tileObj, context, pieceRowNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceRowNumber !== 0) {
        context.lineTo(pieceOffsetX + 3 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        if (tileObj.up === 1) {
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY - 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY - 2 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY - 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        } else {
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
        }
    }
    context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY)
}

const drawRightEdge = (tileObj, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceColumnNumber !== 4) {
        context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 3 * ONE_EIGHTH_PIECE_HEIGHT)
        if (tileObj.right === 1) {
            context.curveTo(pieceOffsetX + 10 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 10 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 10 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 5 * ONE_EIGHTH_PIECE_HEIGHT)
        } else {
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 5 * ONE_EIGHTH_PIECE_HEIGHT)
        }
    }
    context.lineTo(pieceOffsetX + 8 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
}

const drawLowerEdge = (tileObj, context, pieceRowNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceRowNumber !== 3) {
        context.lineTo(pieceOffsetX + 5 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
        if (tileObj.down === 1) {
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 10 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 10 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 10 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 3 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
        } else {
            context.curveTo(pieceOffsetX + 6 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 4 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 3 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
        }
    }
    context.lineTo(pieceOffsetX, pieceOffsetY + 8 * ONE_EIGHTH_PIECE_HEIGHT)
}

const drawLeftEdge = (tileObj, context, pieceColumnNumber, pieceOffsetX, pieceOffsetY) => {
    if (pieceColumnNumber !== 0) {
        context.lineTo(pieceOffsetX, pieceOffsetY + 5 * ONE_EIGHTH_PIECE_HEIGHT)
        if (tileObj.left === 1) {
            context.curveTo(pieceOffsetX - 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX - 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX - 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX, pieceOffsetY + 3 * ONE_EIGHTH_PIECE_HEIGHT)
        } else {
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 6 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 4 * ONE_EIGHTH_PIECE_HEIGHT)
            context.curveTo(pieceOffsetX + 2 * ONE_EIGHTH_PIECE_WIDTH, pieceOffsetY + 2 * ONE_EIGHTH_PIECE_HEIGHT, pieceOffsetX, pieceOffsetY + 3 * ONE_EIGHTH_PIECE_HEIGHT)
        }
    }
    context.lineTo(pieceOffsetX, pieceOffsetY)
}

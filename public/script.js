import zim from "https://zimjs.com/cdn/02/zim"
import { drawPieceEdges } from "./drawPiece.js";
import { onPieceReleased } from "./fitDetection.js";
import { drawHintForPiece } from "./board.js";

const SCALING = "fit"
const WIDTH = 1024
const HEIGHT = 768
const HORIZONTAL_PIECES = 5
const VERTICAL_PIECES = 4
const BOARD_X = 112
const BOARD_Y = 84
let countPieces = 0
export const TOTAL_PIECES = 20

const frame = new zim.Frame(SCALING, WIDTH, HEIGHT)
frame.on("ready", () => {
    const stage = frame.stage

    frame.outerColor = "#444"
    frame.color = "#ddd"

    const con = new zim.Container()

    let imageObj = []
    const piecesConvexity = []  // convexity = wypukłość
    frame.loadAssets(["brave.jpg"], "/img/")

    frame.on("complete", () => {
        imageObj = frame.asset("brave.jpg").clone()
        imageObj.addTo(con)
        imageObj.alpha = 0.2

        const imageWidth = imageObj.width
        const imageHeight = imageObj.height
        const pieceWidth = Math.round(imageWidth / HORIZONTAL_PIECES)
        const pieceHeight = Math.round(imageHeight / VERTICAL_PIECES)

        imageObj.pos(BOARD_X, BOARD_Y)

        for (let j = 0; j < VERTICAL_PIECES; j++) {
            piecesConvexity[j] = []
            for (let i = 0; i < HORIZONTAL_PIECES; i++) {
                const offsetX = pieceWidth * i
                const offsetY = pieceHeight * j

                piecesConvexity[j][i] = {}
                piecesConvexity[j][i].right = Math.floor(Math.random() * 2) !== 0
                piecesConvexity[j][i].down = Math.floor(Math.random() * 2) !== 0

                if (j > 0) piecesConvexity[j][i].up = !piecesConvexity[j - 1][i].down
                if (i > 0) piecesConvexity[j][i].left = !piecesConvexity[j][i - 1].right

                new zim.Rectangle({
                    width: pieceWidth,
                    height: pieceHeight,
                })

                const s = new zim.Shape()

                const context = s.graphics
                s.drag()
                s.mouseChildren = false
                s.addEventListener("pressup", e => {
                    countPieces = onPieceReleased(e, BOARD_X, BOARD_Y, countPieces, stage)
                })
                drawPieceEdges(imageObj, piecesConvexity[j][i], context, j, i, offsetX, offsetY)
                s.addTo(con)

                drawHintForPiece(BOARD_X, BOARD_Y, s, con, context)
                s.animate({
                    obj: {
                        x: zim.rand(-offsetX, frame.width - offsetX - pieceWidth),
                        y: zim.rand(-offsetY, frame.height - offsetY - pieceHeight)
                    }
                })
            }
        }
        con.addTo(stage)
        stage.update()
    })
    stage.update()
})

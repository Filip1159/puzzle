import zim from "https://zimjs.com/cdn/02/zim"
import { drawPieceEdges } from "./drawPiece.js";
import { onPieceReleased } from "./fitDetection.js";
import { drawHintForPiece } from "./board.js";
import { generateRandomPuzzleHooks } from "./randomPuzzleShapeGenerator.js";

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

                generateRandomPuzzleHooks(piecesConvexity, i, j)

                new zim.Rectangle({
                    width: pieceWidth,
                    height: pieceHeight,
                })

                const puzzlePiece = new zim.Shape()

                const context = puzzlePiece.graphics
                puzzlePiece.drag()
                puzzlePiece.mouseChildren = false
                puzzlePiece.addEventListener("pressup", e => {
                    countPieces = onPieceReleased(e, BOARD_X, BOARD_Y, countPieces, stage)
                })
                drawPieceEdges(imageObj, piecesConvexity[j][i], context, j, i, offsetX, offsetY)
                puzzlePiece.addTo(con)

                drawHintForPiece(BOARD_X, BOARD_Y, puzzlePiece, con, context)
                puzzlePiece.animate({
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

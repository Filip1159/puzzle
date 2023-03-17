import createjs from "https://zimjs.org/cdn/1.3.4/createjs_module"
import zim from "https://zimjs.com/cdn/02/zim"
import { drawPieceEdges } from "./drawPiece.js";
import { onPieceReleased } from "./fitDetection.js";

const SCALING = "fit"
const WIDTH = 1024
const HEIGHT = 768
let countPieces = 0
let totalPieces = 0

const frame = new zim.Frame(SCALING, WIDTH, HEIGHT)
frame.on("ready", () => {
    const stage = frame.stage

    let puzzleX
    let puzzleY
    frame.outerColor = "#444"
    frame.color = "#ddd"

    const con = new zim.Container()

    let imageObj = []
    const piecesArrayObj = []
    frame.loadAssets(["brave.jpg"], "/img/")

    const label = new zim.Label({
        text: "CLICK",
        size: 60,
        font: "courier",
        color: "orange",
        rollColor: "red",
        fontOptions: "italic bold"
    })
    stage.addChild(label)
    label.x = label.y = 20

    frame.on("complete", () => {
        imageObj = frame.asset("brave.jpg").clone()
        imageObj.addTo(con)
        imageObj.alpha = 0.2

        const horizontalPieces = 5
        const verticalPieces = 4
        const imageWidth = imageObj.width
        const imageHeight = imageObj.height
        const pieceWidth = Math.round(imageWidth / horizontalPieces)
        const pieceHeight = Math.round(imageHeight / verticalPieces)
        totalPieces = horizontalPieces*verticalPieces

        puzzleX = frame.width/2 - imageWidth/2
        puzzleY = frame.height/2 - imageHeight/2
        imageObj.pos(puzzleX, puzzleY)
        console.log(puzzleX, puzzleY)

        label.text = "Jigsaw Puzzle " + countPieces + "/" + totalPieces

        for (let j = 0; j < verticalPieces; j++) {
            piecesArrayObj[j] = []
            for (let i = 0; i < horizontalPieces; i++) {
                const offsetX = pieceWidth * i
                const offsetY = pieceHeight * j

                piecesArrayObj[j][i] = {}
                piecesArrayObj[j][i].right = Math.floor(Math.random() * 2)
                piecesArrayObj[j][i].down = Math.floor(Math.random() * 2)

                if (j > 0) piecesArrayObj[j][i].up = 1 - piecesArrayObj[j - 1][i].down
                if (i > 0) piecesArrayObj[j][i].left = 1 - piecesArrayObj[j][i - 1].right

                new zim.Rectangle({
                    width: pieceWidth,
                    height: pieceHeight,
                })

                const tileObj = piecesArrayObj[j][i]
                const s = new zim.Shape()

                const context = s.graphics
                s.drag()
                s.mouseChildren = false
                s.addEventListener("pressup", e => {
                    countPieces = onPieceReleased(e, puzzleX, puzzleY, countPieces, totalPieces, label, stage)
                })
                drawPieceEdges(imageObj, tileObj, context, j, i, offsetX, offsetY)
                s.addTo(con)

                const fill = new createjs.Graphics.Fill("red")
                const hint = new zim.Shape()
                hint.mouseChildren = false
                hint.mouseEnabled = false
                s.hint = hint
                hint.graphics = context.clone(true)
                hint.pos(puzzleX,puzzleY)
                hint.graphics._fill = fill
                hint.graphics._fill.style = null
                hint.addTo(con, 0)
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

import createjs from "https://zimjs.org/cdn/1.3.4/createjs_module"
import zim from "https://zimjs.com/cdn/02/zim"

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

        let piecesArray = []
        const horizontalPieces = 5
        const verticalPieces = 4
        const imageWidth = imageObj.width
        const imageHeight = imageObj.height
        const pieceWidth = Math.round(imageWidth / horizontalPieces)
        const pieceHeight = Math.round(imageHeight / verticalPieces)
        const gap = 40
        totalPieces = horizontalPieces*verticalPieces

        puzzleX = frame.width/2 - imageWidth/2
        puzzleY = frame.height/2 - imageHeight/2
        imageObj.pos(puzzleX, puzzleY)
        console.log(puzzleX, puzzleY)

        label.text = "Jigsaw Puzzle " + countPieces + "/" + totalPieces

        for (let j = 0; j < verticalPieces; j++) {
            piecesArrayObj[j] = []
            for (let i = 0; i < horizontalPieces; i++) {
                const n = j + i * verticalPieces

                const offsetX = pieceWidth * i
                const offsetY = pieceHeight * j

                const x8 = Math.round(pieceWidth / 8)
                const y8 = Math.round(pieceHeight / 8)

                piecesArrayObj[j][i] = {}
                piecesArrayObj[j][i].right = Math.floor(Math.random() * 2)
                piecesArrayObj[j][i].down = Math.floor(Math.random() * 2)

                if (j > 0) piecesArrayObj[j][i].up = 1 - piecesArrayObj[j - 1][i].down
                if (i > 0) piecesArrayObj[j][i].left = 1 - piecesArrayObj[j][i - 1].right

                piecesArray[n] = new zim.Rectangle({
                    width: pieceWidth,
                    height: pieceHeight,
                })

                const tileObj = piecesArrayObj[j][i]
                const s = new zim.Shape()

                const context = s.graphics
                s.drag()
                s.mouseChildren = false
                s.addEventListener("pressup", e => {
                    const mc = e.currentTarget
                    const xx = Math.round(mc.x)
                    const yy = Math.round(mc.y)

                    if (xx < puzzleX+gap / 2 && xx > puzzleX-gap / 2 && yy < puzzleX+gap / 2 && yy > puzzleY-gap / 2) {
                        mc.x = puzzleX
                        mc.y = puzzleY
                        mc.noDrag()
                        mc.addTo(mc.parent, 0)
                        mc.mouseChildren = false
                        mc.mouseEnabled = false
                        mc.hint.visible = false
                        countPieces++
                        label.text = "Jigsaw Puzzle " + countPieces + "/" + totalPieces
                        console.log("countPieces", countPieces)
                        if (countPieces == totalPieces) {
                            const pane = new zim.Pane({
                                width: 600,
                                label: "VERY NICE!",
                                height: 250,
                                modal: false,
                                displayClose: false
                            })

                            const confirm = new zim.Button(120, 50, "ON", "green").center(pane).mov(0, 70)

                            confirm.on("click", () => {
                                pane.hide()
                                window.location.replace(window.location.pathname + window.location.search + window.location.hash)
                            })
                            pane.show()
                        }
                        stage.update()
                    }

                })
                context.setStrokeStyle(3,"round")
                // eslint-disable-next-line no-unused-expressions
                context.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).command
                // eslint-disable-next-line no-unused-expressions
                context.beginBitmapFill(imageObj.image).command
                context.moveTo(offsetX, offsetY)

                if (j !== 0) {
                    context.lineTo(offsetX + 3 * x8, offsetY)
                    if (tileObj.up === 1) {
                        context.curveTo(offsetX + 2 * x8, offsetY - 2 * y8, offsetX + 4 * x8, offsetY - 2 * y8)
                        context.curveTo(offsetX + 6 * x8, offsetY - 2 * y8, offsetX + 5 * x8, offsetY)
                    } else {
                        context.curveTo(offsetX + 2 * x8, offsetY + 2 * y8, offsetX + 4 * x8, offsetY + 2 * y8)
                        context.curveTo(offsetX + 6 * x8, offsetY + 2 * y8, offsetX + 5 * x8, offsetY)
                    }
                }
                context.lineTo(offsetX + 8 * x8, offsetY)
                if (i !== horizontalPieces - 1) {
                    context.lineTo(offsetX + 8 * x8, offsetY + 3 * y8)
                    if (tileObj.right === 1) {
                        context.curveTo(offsetX + 10 * x8, offsetY + 2 * y8, offsetX + 10 * x8, offsetY + 4 * y8)
                        context.curveTo(offsetX + 10 * x8, offsetY + 6 * y8, offsetX + 8 * x8, offsetY + 5 * y8)
                    } else {
                        context.curveTo(offsetX + 6 * x8, offsetY + 2 * y8, offsetX + 6 * x8, offsetY + 4 * y8)
                        context.curveTo(offsetX + 6 * x8, offsetY + 6 * y8, offsetX + 8 * x8, offsetY + 5 * y8)
                    }
                }
                context.lineTo(offsetX + 8 * x8, offsetY + 8 * y8)
                if (j !== verticalPieces - 1) {
                    context.lineTo(offsetX + 5 * x8, offsetY + 8 * y8)
                    if (tileObj.down === 1) {
                        context.curveTo(offsetX + 6 * x8, offsetY + 10 * y8, offsetX + 4 * x8, offsetY + 10 * y8)
                        context.curveTo(offsetX + 2 * x8, offsetY + 10 * y8, offsetX + 3 * x8, offsetY + 8 * y8)
                    } else {
                        context.curveTo(offsetX + 6 * x8, offsetY + 6 * y8, offsetX + 4 * x8, offsetY + 6 * y8)
                        context.curveTo(offsetX + 2 * x8, offsetY + 6 * y8, offsetX + 3 * x8, offsetY + 8 * y8)
                    }
                }
                context.lineTo(offsetX, offsetY + 8 * y8)
                if (i !== 0) {
                    context.lineTo(offsetX, offsetY + 5 * y8)
                    if (tileObj.left === 1) {
                        context.curveTo(offsetX - 2 * x8, offsetY + 6 * y8, offsetX - 2 * x8, offsetY + 4 * y8)
                        context.curveTo(offsetX - 2 * x8, offsetY + 2 * y8, offsetX, offsetY + 3 * y8)
                    } else {
                        context.curveTo(offsetX + 2 * x8, offsetY + 6 * y8, offsetX + 2 * x8, offsetY + 4 * y8)
                        context.curveTo(offsetX + 2 * x8, offsetY + 2 * y8, offsetX, offsetY + 3 * y8)
                    }
                }
                context.lineTo(offsetX, offsetY)
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

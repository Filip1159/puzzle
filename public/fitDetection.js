import { showSuccess } from "./gameEnd.js";

const GAP = 40

export const onPieceReleased = (e, puzzleX, puzzleY, countPieces, totalPieces, label, stage) => {
    const mc = e.currentTarget
    const xx = Math.round(mc.x)
    const yy = Math.round(mc.y)

    if (xx < puzzleX+GAP / 2 && xx > puzzleX-GAP / 2 && yy < puzzleX+GAP / 2 && yy > puzzleY-GAP / 2) {
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
        if (countPieces === totalPieces - 19) {
            showSuccess()
        }
        stage.update()
    }
    return countPieces
}

import createjs from "https://zimjs.org/cdn/1.3.4/createjs_module"
import zim from "https://zimjs.com/cdn/02/zim"

export const drawHintForPiece = (pieceOffsetX, pieceOffsetY, s, con, context) => {
    const fill = new createjs.Graphics.Fill("red")
    const hint = new zim.Shape()
    hint.mouseChildren = false
    hint.mouseEnabled = false
    s.hint = hint
    hint.graphics = context.clone(true)
    hint.pos(pieceOffsetX, pieceOffsetY)
    hint.graphics._fill = fill
    hint.graphics._fill.style = null
    hint.addTo(con, 0)
}

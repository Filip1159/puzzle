import zim from "https://zimjs.com/cdn/02/zim"
import { stopTimer } from "./timer.js";

export const showSuccess = () => {
    const pane = new zim.Pane({
        width: 500,
        content: new zim.Label({color: "#555", text: "You win!", size: 50}),
        height: 250,
    })

    const confirm = new zim.Button(160, 50, "Try again", "#59b").center(pane).mov(0, 70)

    confirm.on("click", () => {
        pane.hide()
        window.location.replace(window.location.pathname + window.location.search + window.location.hash)
    })
    stopTimer()
    pane.show()
}

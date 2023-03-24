const timer = document.querySelector("#timer")
let interval = null
let seconds = 0

export const runTimer = () => {
    interval = setInterval(() => {
        let minutes = Math.floor(seconds / 60)
        let secondsMod60 = seconds - minutes * 60
        if (minutes < 10) minutes = `0${minutes}`
        if (secondsMod60 < 10) secondsMod60 = `0${secondsMod60}`
        timer.innerText = `${minutes}:${secondsMod60}`
        seconds++
    }, 1000)
}

export const stopTimer = () => {
    clearInterval(interval)
}

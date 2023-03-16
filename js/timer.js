let elemSeconds = document.querySelector('#seconds')
let titleAlarm = document.querySelector('title')
let resetTime = document.querySelector('#reset')
let numberOfSeconds = elemSeconds.innerText
let isPaused = true
let blockTurnОffTheSound = document.querySelector('#turnОffSound')
let getBtnTurnОffSound = document.querySelector('#btnTurnОffSound')
let btnStart = document.querySelector('#btn-start')
let btnControl = document.querySelector('#btn-control')
let testSoundBtn = document.querySelector('#testSoundAlarm')
let imgBtnTestSound = document.querySelector('#btnTestSound')
let getBtnPopupSetTime = document.querySelector('#set-time')
let soundSelectionTest

let add10Seconds = document.querySelector('#seconds10')
let add1Minute = document.querySelector('#minute1')
let add10Minutes = document.querySelector('#minutes10')
let add20Minutes = document.querySelector('#minutes20')

const $hours = document.querySelector('.timer__hours');
const $minutes = document.querySelector('.timer__minutes');
const $seconds = document.querySelector('.timer__seconds');

let soundSelection = new Audio(`sounds/classic.mp3`)

btnStart.addEventListener('click', start)

resetTime.addEventListener('click', reset)

getBtnTurnОffSound.addEventListener('click', funcTurnОffSound)

testSoundBtn.addEventListener('click', startSoundTest)

getBtnPopupSetTime.addEventListener('click', getPopupTime)

updateCountDownTimer()

add10Seconds.addEventListener('click', () => {
    numberOfSeconds = parseInt(numberOfSeconds) + 10000;
    elemSeconds.innerText = numberOfSeconds
    if (isPaused == true) updateCountDownTimer()
})

add1Minute.addEventListener('click', () => {
    numberOfSeconds = parseInt(numberOfSeconds) + 60000;
    elemSeconds.innerText = numberOfSeconds
    if (isPaused == true) updateCountDownTimer()
})

add10Minutes.addEventListener('click', () => {
    numberOfSeconds = parseInt(numberOfSeconds) + 600000;
    elemSeconds.innerText = numberOfSeconds
    if (isPaused == true) updateCountDownTimer()
})

add20Minutes.addEventListener('click', () => {
    numberOfSeconds = parseInt(numberOfSeconds) + 1200000;
    elemSeconds.innerText = numberOfSeconds
    if (isPaused == true) updateCountDownTimer()
})

function declensionNum(num, words) {
return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}

function updateCountDownTimer() {
    let h = Math.floor(Math.abs(numberOfSeconds / 3600000))
    let m = Math.floor(Math.abs((numberOfSeconds - h * 3600000) / 60000))
    let s =  Math.floor(Math.abs((numberOfSeconds - h * 3600000 - m * 60000) / 1000))

    if (h < 10) h = '0' + h
    if (m < 10) m = '0' + m
    if (s < 10) s = '0' + s

    $hours.innerHTML = h
    $minutes.innerHTML = m
    $seconds.innerHTML = s

    $hours.dataset.title = 'hours'
    $minutes.dataset.title = 'minutes'
    $seconds.dataset.title = 'seconds'

    // для склонения русских слов
    // $hours.dataset.title = declensionNum(h, ['час', 'часа', 'часов']);
    // $minutes.dataset.title = declensionNum(m, ['минута', 'минуты', 'минут']);
    // $seconds.dataset.title = declensionNum(s, ['секунда', 'секунды', 'секунд']);
}

function start(){
    if(btnStart.innerHTML == 'Start') {
        countdownTimer()
        btnStart.innerHTML = 'Pause'
        resetTime.style.display = 'none'
        isPaused = false;
    } else {
        btnStart.innerHTML = 'Start'
        resetTime.style.display = ''
        isPaused = true;
    }
}

function countdownTimer() {
    let timeNow = new Date()
    let timeAlarm = new Date()
    timeAlarm = timeAlarm.getTime() + +numberOfSeconds

    let timerDD = setInterval(() => {
        let endTime = timeAlarm
        let date = new Date()
        date = date.getTime()
        let timeNow = new Date()
        numberOfSeconds = timeAlarm - timeNow

        let h = Math.floor(Math.abs(numberOfSeconds / 3600000))
        let m = Math.floor(Math.abs((numberOfSeconds - h * 3600000) / 60000))
        let s =  Math.floor(Math.abs((numberOfSeconds - h * 3600000 - m * 60000) / 1000))

        $hours.dataset.title = 'hours'
        $minutes.dataset.title = 'minutes'
        $seconds.dataset.title = 'seconds'

        // для склонения русских слов
        // $hours.dataset.title = declensionNum(h, ['час', 'часа', 'часов']);
        // $minutes.dataset.title = declensionNum(m, ['минута', 'минуты', 'минут']);
        // $seconds.dataset.title = declensionNum(s, ['секунда', 'секунды', 'секунд']);
        
        if (s === 60) {
            s = 0
            m = m + 1
        }
    
        if (m === 60) m = 0
            
        if (m === 59 && s != 0) h = h - 1
    
        if (h < 10) h = '0' + h
        if (m < 10) m = '0' + m
        if (s < 10) s = '0' + s

        $hours.innerHTML = h
        $minutes.innerHTML = m
        $seconds.innerHTML = s

        titleAlarm.innerHTML = `${h}:${m}:${s} - Timer Online`

        if (endTime <= date) {
            let soundSelectionValue = document.querySelector('#soundSelect').value
            isPaused = true;
            $hours.innerHTML = '00'
            $minutes.innerHTML = '00'
            $seconds.innerHTML = '00'
            titleAlarm.innerHTML = `00:00:00 - Timer Online`
                if (soundSelectionValue !== 'soundless') {
                    if(isPaused == true) clearInterval(timerDD)
                    startAlamrSound()
                    blockTurnОffTheSound.style.display = ''
                    btnControl.style.display = 'none'
                } else {
                    if(isPaused == true) clearInterval(timerDD)
                    btnStart.innerHTML = 'Start'
                    resetTime.style.display = ''
                }
            }
            if(isPaused == true) clearInterval(timerDD)
    }, 250, timeAlarm)
}

function reset(){
isPaused = true
numberOfSeconds = elemSeconds.innerText
btnStart.innerHTML = 'Start'
updateCountDownTimer()
blockTurnОffTheSound.style.display = 'none'
soundSelection.pause()
titleAlarm.innerHTML = `Timer Online`
}

function funcTurnОffSound () {
    numberOfSeconds = elemSeconds.innerText
    updateCountDownTimer()
    blockTurnОffTheSound.style.display = 'none'
    soundSelection.pause()
    btnStart.innerHTML = 'Start'
    btnControl.style.display = ''
    titleAlarm.innerHTML = `Timer Online`
}

function startSoundTest () {
    let buttonStatus = document.querySelector('#btnTestSound').src
    let soundSelectionValue = document.querySelector('#soundSelect').value
    if (buttonStatus.includes('play') && soundSelectionValue !== 'soundless') {
        imgBtnTestSound.src = 'img/stop.svg'
        soundSelectionTest = new Audio(`sounds/${soundSelectionValue}.mp3`);
        soundSelectionTest.play()
        let checkSoundEnded = setInterval(function() {
            soundSelectionTest.onended = () => {
            clearInterval(checkSoundEnded)
            imgBtnTestSound.src = 'img/play.svg'
            }
        }, 1000);
    } else {
        imgBtnTestSound.src = 'img/play.svg'
        soundSelectionTest.pause()
    }
}

function startAlamrSound () {
    let soundSelectionValue = document.querySelector('#soundSelect').value
    soundSelection = new Audio(`sounds/${soundSelectionValue}.mp3`);
    soundSelection.loop = true
    soundSelection.play()
    return soundSelection
}

function getPopupTime () {
    let hours = document.querySelector('#hour').value * 3600000
    let minutes = document.querySelector('#minute').value * 60000
    let seconds = document.querySelector('#second').value * 1000
    let timeInPopup = hours + minutes + seconds
    if(timeInPopup > 0) {
        elemSeconds.innerText = timeInPopup
        numberOfSeconds = timeInPopup
        updateCountDownTimer()
    }
}
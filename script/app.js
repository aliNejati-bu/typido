let playGround = document.getElementById("playGround");
let button = document.getElementById('button');
let textArea = document.getElementById("input")
let courentText;
let isStart = false;
let textArray = []
let typedTextArray = []
let typedSpan;
let unTypeSpan;
let validCharacters = ["ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "ژ", "س", "ش", "ص", "ض", "ط",
    "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", "ئ", " ","آ","."];

let startTime = 0;
let startedTimer = false;
textPlayGround = document.createElement("div");
textPlayGround.classList.add("typeG");

button.onclick = function () {
    playGround.innerHTML = "";
    playGround.appendChild(textPlayGround);
    let inputText = textArea.innerText;
    let text = textArea.value;
    let unType = text;
    unTypeSpan = document.createElement("span")
    unTypeSpan.innerText = unType;
    unTypeSpan.classList.add("unOK")
    typedSpan = document.createElement("span")
    typedSpan.innerText = "";
    typedSpan.classList.add("ok")
    textPlayGround.appendChild(typedSpan)
    textPlayGround.appendChild(unTypeSpan)
    let timer = document.createElement("div")
    timer.innerHTML = `<span id="min">00</span>:<span id="second">00</span>`;
    playGround.appendChild(timer)
    let checkResult = checkAllPersian(unType, validCharacters);
    if (!checkResult.status) {
        let h2Result = document.createElement("h2")
        h2Result.innerText = checkResult.result
        textPlayGround.innerHTML = ""
        textPlayGround.appendChild(h2Result);
        return
    }

    isStart = true;
    textArray = unType.split("");
    courentText = textArray[0];
}

function checkAllPersian(text, validCharacters) {
    let textArray = text.split('');
    for (let i = 0; i < textArray.length; i++) {
        if (!validCharacters.includes(textArray[i])) {
            let result = "عبارت " + textArray[i] + " قابل قبول نیست.";
            return {
                status: false,
                result
            };
        }
    }
    return {
        status: true,
        result: "validated"
    }

}

function calculateText() {
    typedSpan.innerText = "";
    typedSpan.innerText = typedTextArray.join("");

    unTypeSpan.innerText = "";
    unTypeSpan.innerText = textArray.join("");
}

let handlerNumber;
document.getRootNode().addEventListener("keypress", (event) => {

    if (isStart) {
        if (!startedTimer) {
            startedTimer = true;
            handlerNumber = setInterval(() => {
                startTime += 1;
                let second = startTime % 60;
                let min = parseInt(startTime / 60)
                second = second.toString();
                min = min.toString();
                if (second.length == 1) {
                    second = "0" + second;
                }
                if (min.length == 1) {
                    min = "0" + min;
                }
                document.getElementById("min").innerText = min;
                document.getElementById('second').innerText = second;
            }, 1000)
        }
        if (event.key == courentText) {
            let char = textArray.shift();
            courentText = textArray[0];
            console.log(courentText)
            typedTextArray.push(char)
            calculateText()
            if (textArray.length == 0) {
                isStart = false;
                clearInterval(handlerNumber)
                textPlayGround.innerHTML = "شما موفق شدید هورا <br>" +
                    "سرعت شما : " + ((typedSpan.innerText.split(" ").length) / (startTime == 0 ? 1 : startTime)) * 60 + " کلمه در دقیقه.";
            }
        } else {
            textPlayGround.classList.add("shake")
            setTimeout(() => {
                textPlayGround.classList.remove("shake")
            }, 500)
        }
    }
})
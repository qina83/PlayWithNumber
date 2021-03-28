var refInterval;

const answer = (value) => {
    checkAnswer(value);
    nextLevel();
}


const stringToHtml = string => {
    const div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

const calculateXPosition = (totalItems, index) => {
    let middle = totalItems / 2;
    if (index < middle) return index - middle;
    else return index - middle + 1;
};

const renderTimer = () => {
    const tmr = stringToHtml(
        `<a-timer position="0 1 -2" width="3" endTime="${endTime.getTime()}"/>`
    );
    let exTimer = document.querySelector('a-timer');
    console.log("exTimer", exTimer);
    if (exTimer) exTimer.remove();
    document.querySelector("a-scene").appendChild(tmr);
}

const renderAnswer = (value, xPosition) => {
    return stringToHtml(
        `<a-card position="${xPosition} 1.5 -4" value="${value}" restcolor="red" hovercolor="blue" onClick="application.answer(${value})" />`
    );
}

const renderStartButton = () => {
    const scene = document.querySelector('a-scene');
    scene.appendChild(stringToHtml(
        `<a-card id="init" position="0 2.5 -2" value="Gioca" restcolor="red" hovercolor="blue" onClick="application.init()" />`
    ));
}

const refreshAnswers = (values) => {
    Array
        .from(document.querySelectorAll('a-card'))
        .forEach(a => a.remove());

    const scene = document.querySelector('a-scene');
    for (let i = 0; i < values.length; i++) {
        scene.appendChild(
            renderAnswer(values[i], calculateXPosition(values.length, i))
        );
    }
}

refreshLife = (lives) => {
    if (lives === 1) document.querySelector('#lives').setAttribute("value", `Hai ${lives} vita`);
    else
        document.querySelector('#lives').setAttribute("value", `Hai ${lives} vite`)
}

refreshScore = (score) => {
    if (score === 1) document.querySelector('#score').setAttribute("value", `Hai ${score} punto`);
    else
        document.querySelector('#score').setAttribute("value", `Hai ${score} punti`)
}

refreshQuestion = (question) => {
    document.querySelector('#question').setAttribute("value", question);
}

const quizEnded = () => {
    document.querySelector('#question').setAttribute("visible", "false");
    document.querySelector('#lives').setAttribute("visible", "false");
    Array
        .from(document.querySelectorAll('a-card'))
        .forEach(a => a.remove());
    renderStartButton();

}

const generateQuiz = () => {
    let quiz = generateQuestion();
    refreshQuestion(quiz.question);
    refreshAnswers(quiz.answers);
}

const restartQuiz = () => {
    document.querySelector('#question').setAttribute("visible", "true");
    document.querySelector('#score').setAttribute("visible", "true");
    document.querySelector('#lives').setAttribute("visible", "true");
    document.querySelector('#init').remove();
    resetQuiz();
    nextLevel();

}

const nextLevel = () => {
    refreshLife(lives);
    if (checkQuizEnd()) {
        quizEnded();
        clearInterval(refInterval);
    }
    else {        
        refreshScore(score);
        generateQuiz();
        startQuiz();
        renderTimer();
    }
}

const init = () => {
    restartQuiz();
    refInterval = setInterval(() => {
        if (checkTimeUp()) {
            nextLevel();
        }
    }, 100);
}

window.addEventListener("load", function (event) {
    renderStartButton();
});

window.application = {
    answer,
    init
}
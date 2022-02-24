var timerKey = 'timer';
var sOriginalTime = 1000 * 60 * 5;
var theTimerInterval;
var wrongAnswerPenalty = 1000 * 30;
var myScore = 0;
var myScoreKey = 'score';
var questIdPrefix = 'quest';
var highScores = [];
var highScoreKey = 'high-score;'



function setUpTimer() {
    //clear the timer from localstorage
    localStorage.removeItem(timerKey);
    //set timer in local storage to sOriginalTime
    localStorage.setItem(timerKey, `${sOriginalTime}`);
    console.log("setUpTimer timerKey ", timerKey);
    console.log("setUpTimer sOriginalTime ", sOriginalTime);
}

function startTimer() {
    theTimerInterval = setInterval(showTimer, 1000, timerKey);
    console.log("startTimer");
}

function setUpScore() {
    //clear the timer from localstorage
    localStorage.removeItem(myScoreKey);
    //set timer in local storage to sOriginalTime
    localStorage.setItem(myScoreKey, '0');
    console.log("setUpScore myScoreKey ", myScoreKey);
}

function startShowScore() {
    theScoreInterval = setInterval(showScore, 1000, myScoreKey);
    console.log("startShowScore");
}

function wrongAnswer() {
    decrementTimer(wrongAnswerPenalty);
    console.log("wrongAnswer");
}

function showTimer(id) {
    let newVal = decrementTimer(1000);
    console.log("newVal ", newVal);
    //show the value of the timer
    let val = parseInt(localStorage.getItem(timerKey));
    document.getElementById(id).innerHTML = val/1000;
    console.log('showTimer id', id);
    console.log('showTimer document.getElementById(id).innerHTML',  document.getElementById(id).innerHTML);

    console.log('showTimer localStorage.getItem(timerKey)',  localStorage.getItem(timerKey));
}

function showScore(id) {
    let score = parseInt(localStorage.getItem(myScoreKey));
    document.getElementById(id).innerHTML = score;
}

function decrementTimer(decrementBy) {
    console.log('decrementTimer decrementBy',  decrementBy);
    let timeRemaining = parseInt(localStorage.getItem(timerKey));
    if(timeRemaining) {
        if(timeRemaining <= 0) {
            localStorage.setItem(timerKey, `0`);
        }
        else {
            let newTimeRemaining = timeRemaining - decrementBy;
            localStorage.setItem(timerKey, `${newTimeRemaining}`);
        }

    }
    else {
        localStorage.setItem(timerKey, `0`);
    }

    return parseInt(localStorage.getItem(timerKey));
}

function stopTimer() {
    clearInterval(theTimerInterval);
}

function stopTheScoreInterval() {
    clearInterval(theScoreInterval);
}


/************************** */
var sQuestion = 'sQuestion';

function setupQuestionSection() {
    //clear the timer from localstorage
    localStorage.removeItem(sQuestion);
    //set timer in local storage to sOriginalTime
    localStorage.setItem(sQuestion, `quest0`);
}

function prepareQuestionAndAnswers(questionId, i) {
    console.log("prepareQuestionAndAnswers questionId", questionId);

    console.log("prepareQuestionAndAnswers i", i);
    let questionSec = document.getElementById('questions');
    let questionBlock = document.createElement('div');
    questionBlock.id = questionArr[i].id;
    questionBlock.className = "question";
    console.log("prepareQuestionAndAnswers questionBlock", questionBlock);

    let qSpan = document.createElement('span');
    qSpan.innerText = questionArr[i].question;
    questionBlock.appendChild(qSpan);

    if(questionArr[i].answer1){
        let answer = document.createElement('div');
        let chk = document.createElement('input');
        let label = document.createElement('label');

        chk.id = `${questionArr[i].id}_answer1`
        chk.setAttribute('type','checkbox');
        chk.value = 1;
        chk.classList.add('answer');
        chk.classList.add(`${questionArr[i].id}`);
        
        label.innerText = questionArr[i].answer1;
        label.setAttribute('for',`${chk.id}`);

        answer.classList.add('answer');
        answer.appendChild(chk);
        answer.appendChild(label);
        questionBlock.appendChild(answer);
    }

    if(questionArr[i].answer2){
        let answer = document.createElement('div');
        let chk = document.createElement('input');
        let label = document.createElement('label');

        chk.id = `${questionArr[i].id}_answer2`
        chk.setAttribute('type','checkbox');
        chk.value = 2;
        chk.classList.add('answer');
        chk.classList.add(`${questionArr[i].id}`);
        
        label.innerText = questionArr[i].answer2;
        label.setAttribute('for',`${chk.id}`);

        answer.classList.add('answer');
        answer.appendChild(chk);
        answer.appendChild(label);
        questionBlock.appendChild(answer);
    }

    if(questionArr[i].answer3){
        let answer = document.createElement('div');
        let chk = document.createElement('input');
        let label = document.createElement('label');

        chk.id = `${questionArr[i].id}_answer3`
        chk.setAttribute('type','checkbox');
        chk.value = 3;
        chk.classList.add('answer');
        chk.classList.add(`${questionArr[i].id}`);
        
        label.innerText = questionArr[i].answer3;
        label.setAttribute('for',`${chk.id}`);

        answer.classList.add('answer');
        answer.appendChild(chk);
        answer.appendChild(label);
        questionBlock.appendChild(answer);
    }

    if(questionArr[i].answer4){
        let answer = document.createElement('div');
        let chk = document.createElement('input');
        let label = document.createElement('label');

        chk.id = `${questionArr[i].id}_answer4`
        chk.setAttribute('type','checkbox');
        chk.value = 4;
        chk.classList.add('answer');
        chk.classList.add(`${questionArr[i].id}`);
        
        label.innerText = questionArr[i].answer4;
        label.setAttribute('for',`${chk.id}`);

        answer.classList.add('answer');
        answer.appendChild(chk);
        answer.appendChild(label);
        questionBlock.appendChild(answer);
        questionBlock.appendChild
    }

    //only show a Back button after the first question
    if(i> 0) {
        let btnBck = document.createElement('button');
        btnBck.innerText = "Back";
        btnBck.setAttribute('onclick',`getQuestion(this,${i-1});`);
        questionBlock.appendChild(btnBck);
        questionSec.appendChild(questionBlock);
    }
    

    let btnNxt = document.createElement('button');
    btnNxt.innerText = "Next";
    btnNxt.setAttribute('onclick',`evaluateQuestion(this,${i});`);
    questionBlock.appendChild(btnNxt);
    questionSec.appendChild(questionBlock);
    
}

function getQuestion(questionId) {
    console.log("getQuestion questionId", questionId);

    let found = false;

    console.log("getQuestion questionArr", questionArr);
    for(let i = 0; i<questionArr.length; i++) {
        console.log("getQuestion questionArr[i]", questionArr[i]);
        if(questionId == questionArr[i].id) {
            localStorage.setItem(sQuestion, questionId);
            prepareQuestionAndAnswers(questionId, i);
            found = true
            break;
        }
    }

    return found;
}

var questionArr = [];

function setupQuestionsAndAnswers() {
    let question1 = {
        id:"quest0", 
        question:"To select elements with a specific class: ", 
        answer1:" write a semicolon (;) character, followed by the class name.", 
        answer2:" write a period (.) character, followed by the class name.", 
        answer3:" write a period (.) character", 
        answer4:"write a comma (,) character", 
        correctAnswer:2
    };
    let question2 = {
        id:"quest1", 
        question:"In CSS, a color can be specified by using a predefined color name.", 
        answer1:"yes", 
        answer2:"no", 
        answer3:null, 
        answer4:null, 
        correctAnswer:1
    };
    let question3 = {
        id:"quest2", 
        question:"To horizontally center a block element", 
        answer1:"width: auto", 
        answer2:"border: auto", 
        answer3:"padding: auto", 
        answer4:"margin: auto", 
        correctAnswer:4
    };
    let question4 = {
        id:"quest3", 
        question:"Use the _____ property to determine the width of the input field:", 
        answer1:"width", 
        answer2:"height", 
        answer3:"margin", 
        answer4:null, 
        correctAnswer:1
    };

    questionArr.push(question1);
    questionArr.push(question2);
    questionArr.push(question3);
    questionArr.push(question4);

    console.log("setupQuestionsAndAnswers: ", setupQuestionsAndAnswers);

}



function gradeQuestion(questionId, answerNumber) {
    let isCorrect = false;
    for(let i=0; i< questionArr.length; i++){
        if(questionId == questionArr[i].id &&  answerNumber == questionArr[i].correctAnswer) {
            isCorrect = true;
            break;
        }
    }

    return isCorrect;
}


function evaluateQuestion(element, questNum) {
    console.log(element);
    let questId = `quest${questNum}`
    let checkBoxesAnswersAll = document.querySelectorAll('input:checked');
    console.log('checkBoxesAnswersAll: ', checkBoxesAnswersAll);
    let chkbox;
    for(let i =0; i < checkBoxesAnswersAll.length; i++ )
    {
        let cbId = checkBoxesAnswersAll[i].id;
        if(cbId.includes(`${questId}`)) {
            chkbox = checkBoxesAnswersAll[i];
        }
    }
    console.log('chkbox: ', chkbox);
    let answerNum = chkbox.value;
    console.log('answerNum: ', answerNum);

    let keepGoing = false;
    //if the time has not elapsed continue otherwise skip to last screen.
    if(parseInt(localStorage.getItem(timerKey)) > 0 )
    {
        //if the question is correct add points
        let answer = gradeQuestion(questId, answerNum);
        console.log("evaluateQuestion answer ", answer);

        if(answer)
        {
            let myScore = parseInt(localStorage.getItem(myScoreKey));
            localStorage.setItem(myScoreKey, `${myScore + 10}` );
            alert('Correct');
            console.log("evaluateQuestion localStorage.getItem(myScoreKey) ", localStorage.getItem(myScoreKey));
        }
        else {
            //else if the question is incorrect decrementTimer by 30 sec
            decrementTimer(wrongAnswerPenalty);
            console.log("decrementTimer wrongAnswerPenalty", wrongAnswerPenalty);
            alert('Incorrect');
        }

        document.getElementById(questId).classList.add('hide');

        let nextQuestId = questIdPrefix + `${questNum+1}`;
        //go to next question
        keepGoing = getQuestion(nextQuestId)
        console.log("getQuestion questId", nextQuestId);

        console.log("getQuestion keepGoing", keepGoing);

    }
    else {
        keepGoing = false;
    }


    if(!keepGoing) {
        let screen = document.getElementById('enterHighScore');
        screen.classList.remove('hide');
        localStorage.setItem(timerKey, '0');
        stopTimer();
        stopTheScoreInterval();
    }

}

/******************* */

function doGame() {
    hideWelcome();
    showScoreBoard();
    setupQuestionsAndAnswers();
    //set up the timer
    setUpTimer();
    setUpScore();
    startTimer();
    startShowScore();
    setupQuestionSection();
    getQuestion('quest0');
}

function hideWelcome() {
    let welcome = document.getElementById('welcome');
    welcome.classList.add('hide');
}

function showScoreBoard() {
    let scoreboard = document.getElementById('score-board');
    scoreboard.classList.remove('hide');
}

function setUpHighScore() {
    //set timer in local storage to sOriginalTime
    if(!localStorage.getItem(highScoreKey)) {
        localStorage.setItem(highScoreKey, JSON.stringify(highScores))
    }

}

function addScore() {
    console.log("addScore");
    let hScores = localStorage.getItem(highScoreKey) 
    ? JSON.parse(localStorage.getItem(highScoreKey))
    : [];

    console.log("addScore hScores", hScores);

    let tbInitials = document.getElementById('tbInitials');
    console.log("addScore tbInitials", tbInitials);
    if(!tbInitials.value) {
        alert('Please enter your initials');
        return;
    }

    let score = parseInt(localStorage.getItem(myScoreKey));
    console.log("addScore score", score);

    let myHighScore = {
        initials: tbInitials.value,
        score: score
    }

    hScores.push(myHighScore);
    hScores.sort(function(a,b) {
        if(a.score < b.score) {
            return 1;
        }
        else {
            return -1;
        }
    })

    localStorage.setItem(highScoreKey, JSON.stringify(hScores))

    console.log('high scores: ', hScores);
    showHighScores();

}

function showHighScores() {
    let highScoresDiv = document.getElementById('high-scores');
    let table = document.createElement('table');
    let tableRowHeader = document.createElement('tr');
    let tableheader0 = document.createElement('th');
    let tableheader1 = document.createElement('th');
    let tableheader2 = document.createElement('th');


    tableheader0.innerText = 'Rank';
    tableheader1.innerText = 'Score';
    tableheader2.innerText = 'Initials';
    tableRowHeader.appendChild(tableheader0);
    tableRowHeader.appendChild(tableheader1);
    tableRowHeader.appendChild(tableheader2);
    table.appendChild(tableRowHeader);

    let hScores = localStorage.getItem(highScoreKey) 
    ? JSON.parse(localStorage.getItem(highScoreKey))
    : [];

    let i=0;
    while(i<hScores.length ) {
        console.log("hScores[i].score: ", hScores[i].score);
        console.log("hScores[i].initals: ", hScores[i].initials);
        let tableRow = document.createElement('tr');
        let tableCell0 = document.createElement('td');
        let tableCell1 = document.createElement('td');
        let tableCell2 = document.createElement('td');
        tableCell0.innerText = i+1;
        tableCell1.innerText = hScores[i].score;
        tableCell2.innerText = hScores[i].initials;
        tableRow.appendChild(tableCell0);
        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        table.appendChild(tableRow);
        i++;
    }

    highScoresDiv.appendChild(table);
    highScoresDiv.classList.remove('hide');

    document.getElementById('enterHighScore').classList.add('hide');
    document.getElementById('score-board').classList.add('hide');
}


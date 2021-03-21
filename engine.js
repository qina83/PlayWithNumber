var score = 0;
var lives = 3;
var correctAnswer = 0;
var roundDuration = 10;
var startTime = new Date();
var endTime = new Date();

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
}


const checkAnswer = (answer) => {
  if (answer == correctAnswer){
    score++;
    return true;
  }
  else{
    lives--;
  }
  return false;
}

const generateQuestion = () => {
  let x = Math.floor(Math.random() * 10) + 1;
  let y = Math.floor(Math.random() * 10) + 1;

  correctAnswer = x * y;
  let answer1 = x * y;
  let answer2 = (x - 1) * y;
  let answer3 = x * (y - 1);
  let answer4 = (x + 1) * (y - 1);

  let answers = [answer1, answer2, answer3, answer4];
  shuffle(answers);
  return {
    question: `${x}x${y}`,
    answers:  answers
  };
}

const checkQuizEnd = ()=>{
  if (lives === 0) return true;
  else return false;
}

const checkTimeUp = () =>{
  if (new Date() > endTime){
    lives = lives > 0 ? lives-1: 0;
    return true;
  }
  return false;
}
const resetQuiz = () =>{
  lives = 3;
  score = 0;
}

const startQuiz = ()=>{
  startTime = new Date();
  endTime = new Date(startTime.getTime());
  endTime.setSeconds( endTime.getSeconds() + roundDuration );
}
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion =  document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); 
let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again');
const questions = [
    {
        question: 'Сколько планет в солнечной системе?',
        options: [
            '10',
            '7',
            '8',
            '9',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое солнце?',
        options: [
            'Планета',
            'Звезда',
            'Астероид',
            'Спутник'
        ],
        rightAnswer: 1
    },
    {
        question: 'Когда был первый полет в космос?',
        options: [
            '12 апреля 1961',
            '12 августа 1962',
            '15 сентября 1961',
            '18 июля 1963',
        ],
        rightAnswer: 0
    },
    {
        question: 'Самая большая планета солнечной системы?',
        options: [
            'Земля',
            'Солнце',
            'Венера',
            'Юпитер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Самая маленькая планета солнечной системы?',
        options: [
            'Уран',
            'Марс',
            'Меркурий',
            'Нептун',
            
        ],
        rightAnswer: 2
    },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let complitedAnswers = [];
const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length){
        quizOver()
    } else {
        if(complitedAnswers.length > 0){
            complitedAnswers.forEach(item => {
                if (item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(complitedAnswers.length == 0){
            indexOfQuestion=randomNumber;
            load();
        }
    }
    complitedAnswers.push(indexOfQuestion);
}

const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}
for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

disabledOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const enableOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () =>{
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status =>{
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate = () =>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать хотя бы один вариант ответа');
    } else{
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () =>{
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;

};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () =>{
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})

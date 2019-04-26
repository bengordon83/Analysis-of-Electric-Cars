const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [{
    id: 1,
    num: "1.",
    question: "True or False: Electric cars always result in less emissions than traditional gas-powered automobiles since they do not release exhaust from their engines.",
    choices: ["True", "False"],
    correctAnswer: "False",
    answer: null
  }, {
    id: 2,
    num: "2.",
    question: "As electric vehicle users are becoming more conscious of all potential negative externalities of their production, there are demanding energy grids be sourced from clean energy. In particular, they are pushing increased use of solar-powered energy. What percent of electric vehicle users have electric vehicle drivers do you think have access to rooftop solar energy that they use to power their vehicles?",
    choices: ["8-16%", "16-24%", "24-32%", "32-40%", "40-48%"],
    correctAnswer: "32-40%",
    answer: null
  }, {
    id: 3,
    num: "3.",
    question: "True or False: Despite the operation of full-size electric vehicles resulting in fewer emissions than traditional automobiles on average, they still result in more overall emissions due to how environmentally invasive their production is.",
    choices: ["True", "False"],
    correctAnswer: "False",
    answer: null
  }, {
    id: 4,
    num: "4.",
    question: "When mining for cobalt and lithium, mining companies pour ammonium sulfate down large holes to extract the materials. Of all the material in the hole, what percent do you think is utilized for actual manufacturing purposes?",
    choices: ["0.1%", "0.2%", "2%", "5%", "10%"],
    correctAnswer: "0.2%",
    answer: null
  }, {
    id: 5,
    num: "5.",
    question: "True or False: - Electric cars more kinetically efficient than their gasoline counterparts.",
    choices: ["True", "False"],
    correctAnswer: "True",
    answer: null
}, {
    id: 6,
    num: "6.",
    question: "True or False: - Cold weather affects the battery life of an electric vehicle.",
    choices: ["True", "False"],
    correctAnswer: "True",
    answer: null
}, {
    id: 7,
    num: "7.",
    question: "What percent of the electric car battery is transferred directly to power the car?",
    choices: ["50%", "95%", "80%", "30%"],
    correctAnswer: "80%",
    answer: null
}, {
    id: 8,
    num: "8.",
    question: "How much is lithium consumption expected to grow by from 2000 to 2025?",
    choices: ["Stay the same", "Double", "Triple", "Quadruple"],
    correctAnswer: "Quadruple",
    answer: null
}, {
    id: 9,
    num: "9.",
    question: "In South America, how much water is required to bring lithium to the surface of the earth?",
    choices: ["100 gallons per ton lithium", "500 gallons per ton lithium", "1,000 gallons per ton lithium", "500,000 gallons per ton lithium"],
    correctAnswer: "500,000 gallons per ton lithium",
    answer: null
}, {
    id: 10,
    num: "10.",
    question: "True or False: Lithium batteries are 95% recyclable. ",
    choices: ["True", "False"],
    correctAnswer: "True",
    answer: null
  }
]


const surveyState = {
    currentQuestion: 1
}


const navigateButtonClick = (e) => {
    if(e.target.id == 'next') {
        surveyState.currentQuestion++
        initialSurvey()
    }

    if(e.target.id == 'prev') {
        surveyState.currentQuestion--
        initialSurvey()
    }
}

const checkBoxHandler = (e, question) => {    
    //Check if the chekbox has selected before if it is remove selected
    if(!e.target.checked) {
        e.target.checked = false
        question.answer = null
        return
    }
    
    const allCheckBoxes = choicesEl.querySelectorAll('input')
    allCheckBoxes.forEach(checkBox => checkBox.checked = false)
    e.target.checked = true
    question.answer = e.target.value    
}

const getResults = () => {
    const correctAnswerCount = survey.filter(question => question.answer == question.correctAnswer).length
    const emptyQuestionCount = survey.filter(question => question.answer === null).length
    const wrongQuestionCount = survey.filter(question => question.answer !== null && question.answer != question.correctAnswer).length


    return {
        correct: correctAnswerCount,
        empty: emptyQuestionCount,
        wrong: wrongQuestionCount
    }
}


const renderQuestion = (question) => {    
    //Last question of survey
    const lastQuestion = survey[survey.length - 1]

    //Check if the all questions are answered if then insert some message
    if(surveyState.currentQuestion > lastQuestion.id) {
        const results = getResults()
        containerEl.innerHTML = `<h1 class="test-completed">Good Job! You have completed the mini quiz</h1>
        <p class="results-info"> You got a <strong>${results.correct}</strong> out of 10.</p>                        
        <span class="tick"></span>`
        var image;
        for (var i =0; i < survey.length; i++){
            image = "images/q" + survey[i].num + "png";

            var element = document.createElement('div');
            element.type = 'container';
            element.innerText = survey[i].num;
            element.id = i;
            document.body.appendChild(element);
            
            var element1 = document.createElement('div');
            element1.type = 'container';
            element1.innerText = survey[i].question;
            element1.id = i;
            document.body.appendChild(element1);

            var element2 = document.createElement('div');
            element2.type = 'container';
            element2.innerText = "Your answer: " + survey[i].answer;
            element2.id = i;
            document.body.appendChild(element2);

            var element3 = document.createElement('div');
            element3.type = 'container';
            element3.innerText = "Correct answer: " + survey[i].correctAnswer;
            element3.id = i;
            document.body.appendChild(element3);

            var element4 = document.createElement('img');
            element4.type = 'container';
            element4.src = image;
            element4.id = i;
            document.body.appendChild(element4);


        }

        return
                                
    }

    // Clean innerHTML before append
    surveyNumEl.innerHTML = ''
    choicesEl.innerHTML = ''
    buttonEl.innerHTML = ''
    // Render question and question id
    surveyNumEl.textContent = question.id + '-'
    questionEl.textContent = question.question
    // Render choices
    question.choices.forEach(choice => {
        const questionRowEl = document.createElement('p')
        questionRowEl.setAttribute('class','question-row')
        questionRowEl.innerHTML = `<label class="label">                                        
                                        <span class="choise">${choice}</span>
                                    </label>`
        //Create checkbox input
        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'checkbox')
        // Bind checkboxHandler with event and current question
        checkBoxEl.addEventListener('change', (e) => checkBoxHandler(e, question))
        //Add answer to the input as a value
        checkBoxEl.value = choice
        //If question has answer already make it checked again
        if(question.answer === choice) {
            checkBoxEl.checked = true
        }
        //Insert into question row
        questionRowEl.firstChild.prepend(checkBoxEl)
        //Insert row to the wrapper
        choicesEl.appendChild(questionRowEl)                                    
    })

    //Next & Previous Buttons
    const prevButton = document.createElement('button')
    prevButton.classList.add('nav-button')
    prevButton.classList.add('prev')
    prevButton.id = 'prev'
    prevButton.textContent = 'Previous'
    prevButton.addEventListener('click', navigateButtonClick)

    const nextButton = document.createElement('button')
    nextButton.classList.add('nav-button')
    nextButton.classList.add('next')
    nextButton.id = 'next'
    nextButton.textContent = 'Next'
    nextButton.addEventListener('click', navigateButtonClick)



    //Display buttons according to survey current question
    if(question.id == 1){        
        buttonEl.appendChild(nextButton)
    } else if (surveyState.currentQuestion == lastQuestion) {
        buttonEl.appendChild(prevButton)
    } else {
        buttonEl.appendChild(prevButton)
        buttonEl.appendChild(nextButton)
    }   
    
}

const initialSurvey = () => {
    //Get the current question
    const currentQuestion = survey.find(question => question.id === surveyState.currentQuestion)
    // Render the currentQuestion
    renderQuestion(currentQuestion)    

}

initialSurvey()
class Answer {
    constructor(text, correct, num, questNum, topicNum) {
        this.textOfAnswer = text;
        this.correctAnswer = correct;       //true or false
        this.numAnswerInQuest = num;        //номер ответа в вопросе
        this.numberOfQuestion = questNum;   //вопроса
        this.numberOfTopic = topicNum;      //темы
    }
}

class Answers {
    constructor(text = [], correct = [], questNum, topicNum) {
        this.textOfAnswer = text;
        this.numderOfQuestion = questNum;
        this.numberOfTopic = topicNum;
        this.ans = [];
        for (var i = 1; i <= 4; i++) {
            this.ans[i] = new Answer(text[i], correct[i], i, questNum, topicNum);
        }
    }
}

class Question {
    constructor(questionText, answersText, correct, questNum, topicNum) {
        this.textOfQuestion = questionText;
        this.ans = new Answers(answersText, correct, questNum, topicNum);
    }
}

class Topic {
    constructor(name, topicNum, quantityQuest, questTexts, ansTexts, correct) {
        this.nameOfTopic = name;
        this.numberOfTopic = topicNum;
        this.quantityOfQuestions = quantityQuest;
        this.textsOfQuestions = questTexts;
        this.quests = [];

        for (var i = 0; i <= quantityQuest; i++) {
            this.quests[i] = new Question(questTexts[i], ansTexts[i], correct[i], i, topicNum);
        }
    }

}

class educationCourse {
    constructor(name, quanTopics, quanQuestions, topicsName, questTexts, ansTexts, correct) {
        this.nameOfCourse = name;
        this.quantityOfTopics = quanTopics;
        this.quantityOfQuestions = quanQuestions;
        this.namesOfTopics = topicsName;
        this.topics = [];
        for (var i = 0; i <= quanTopics; i++) {
            this.topics[i] = new Topic(topicsName[i], i, quanQuestions[i], questTexts[i], ansTexts[i], correct[i]);
        }
    }
}

var numOfQuestions = [3, 4, 4];
var topicNames = ['Solar system', 'Galaxies', 'planet Earth'];
var questionTexts = [
    ['quantity of planets', 'our natural satellite', 'biggest planet in system'],
    ['name of our galazy', 'nearest galaxy', 'what in center of galaxy', 'form of many galaxies'],
    ['how many seas on planet', 'how many mainlands', 'biggest mainland', 'where is Heops pyramid']
];
var answersTexts = [
    [['6', '7', '8', '9'], ['moon', 'titan', 'phoenix', 'num'], ['earth', 'jupiter', 'saturn', 'neptun']],
    [['milky way', 'coffe break', 'time to tea', 'claster phoenix'], ['Artemida', 'claster phoenix', 'andromeda', 'stolpy sozidaniya'], ['orange soda', 'red line', 'lost bkbshechka', 'black hole'], ['pyramid', 'spiral', 'cube(ice)', 'ball']],
    [['69', '228', '322', '1337'], ['6', '7', '8', '9'], ['mother Raussia(oops,Evrazia)', 'north america', 'australia', 'Mozdok'], ['on my... way', 'Mozdok', 'in cup of tea', 'Egypt']]
];

var correctAnswers = [
    [[false, false, true, false], [true, false, false, false], [false, true, false, false]],
    [[true, false, false, false], [false, false, true, false], [false, false, false, true], [false, true, false, false]],
    [[false, false, true, false], [true, false, false, false], [true, false, false, false], [false, false, false, true]]
];

var ec = new educationCourse('Universe', 3, numOfQuestions, topicNames, questionTexts, answersTexts, correctAnswers);



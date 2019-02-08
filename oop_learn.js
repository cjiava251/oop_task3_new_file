/*
class Topic {
    constructor(title) {
        this.title=title;
    }

    test(numberOfQuestions,textOfQuestion,answer1,answer2,answer3,answer4,rightAnswer) {
        this.numberOfQuestions=numberOfQuestions;
        this.textOfQuestion=textOfQuestion;
        this.answer1=answer1;
        this.answer2=answer2;
        this.answer3=answer3;
        this.answer4=answer4;
        this.rightAnswer=rightAnswer;
        var fl=0, sum=0;
        for (var i=0; i<numberOfQuestions; i++) {
            fl=0;
            while (fl==0) {
                this.result=prompt('Вопрос №'+(i+1)+'\n'+this.textOfQuestion[i]+'\n 1) '+this.answer1[i]+'\n 2) '+this.answer2[i]+'\n 3) '+this.answer3[i]+'\n 4) '+this.answer4[i]);
                if (this.result==this.rightAnswer[i]) {
                    alert('Верно!');
                    fl=1;
                    sum=sum+1;
                }
                else if ((this.result!=null) && (this.result!='')) {   
                    alert('Неверно!');
                    fl=1;
                }
                else 
                    alert('Вы не ответили на вопрос. Введите ответ!'); 
            }
        }
        alert('Количество верных ответов: '+sum);
    }
}

var textsOfQuestions=[], qAnswers1=[], qAnswers2=[], qAnswers3=[], qAnswers4=[], qRightAnswers=[];

textsOfQuestions[0]='Сколько планет в солнечной системе?';
textsOfQuestions[1]='Назовите естественный спутник Земли?';
textsOfQuestions[2]='В какой галактике находится Солнечная система?';
textsOfQuestions[3]='Назовите ближайшую планету к Земле?';

qAnswers1[0]=6;
qAnswers2[0]=7;
qAnswers3[0]=8;
qAnswers4[0]=9;
qRightAnswers[0]=3;

qAnswers1[1]='Титан';
qAnswers2[1]='Луна';
qAnswers3[1]='Венера';
qAnswers4[1]='Хаббл';
qRightAnswers[1]=2;

qAnswers1[2]='Млечный путь';
qAnswers2[2]='Андромеда';
qAnswers3[2]='Водоворот';
qAnswers4[2]='Большое Магелланово Облако';
qRightAnswers[2]=1;

qAnswers1[3]='Венера';
qAnswers2[3]='Меркурий';
qAnswers3[3]='Плутон';
qAnswers4[3]='Марс';
qRightAnswers[3]=4;

//stars=new Topic('Солнечная система');
//stars.test(4,textsOfQuestions,qAnswers1,qAnswers2,qAnswers3,qAnswers4,qRightAnswers);
*/




class Answer {
    constructor(text, correct, num, questNum, topicNum) {
        this.textOfAnswer = text;
        this.correctAnswer = correct;  //true or false
        this.numAnswerInQuest = num;   //номер ответа в вопросе
        this.numberOfQuestion = questNum;
        this.numberOfTopic = topicNum;
    }
}

class Answers {
    constructor(text, correct, questNum, topicNum) {
        this.textOfAnswer = text;           //string     текст ответа
        this.numderOfQuestion = questNum;   //integer    номер вопроса
        this.numberOfTopic = topicNum;      //integer    номер темы

        for (var i = 1; i <= 4; i++) {
            ans[i] = new Answer(text[i], correct[i], i, questNum, topicNum);
        }
    }
}

class Question {
    constructor(questionText, answersText, correct, questNum, topicNum) {
        this.textOfQuestion = questionText;         //текст вопроса
        ans = new Answers(answersText, correct, questNum, topicNum);
    }
}


class Topic {
    constructor(name, topicNum,quantityQuest,questTexts,ansTexts,correct) {
        this.nameOfTopic = name;
        this.numberOfTopic = topicNum;   
        this.quantityOfQuestions=quantityQuest;    
        this.textsOfQuestions=questTexts;
        
        for (var i=0;i<=quantityQuest;i++) {
            quests[i]=new Question(questTexts[i],ansTexts[i],correct[i],i,topicNum);
        }
    }

}


class educationCourse {
    constructor(name, topics, quanQuestions, topicsName,questTexts,ansTexts,correct) {
        this.nameOfCourse = name;
        this.quantityOfTopics = topics;             //количество тем   integer
        this.quantityOfQuestions = quanQuestions;       //вопросов          array of integer
        this.namesOfTopics=topicsName;


        for (var i=0;i<=topics;i++) {
            topics[i]=new Topic(topicsName[i],i,quanQuestions[i],questTexts[i],ansTexts[i],correct[i]);
        }
    }
}





//var theme=new Topic('universe',)


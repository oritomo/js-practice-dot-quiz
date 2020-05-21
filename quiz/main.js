'use strict';

//シャッフルのアルゴリズムが肝
//配列をそのまま渡すのではなくてコピーを渡すことが大事。じゃないと元の配列がシャッフルされてしまい正解がおかしくなってしまう。
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    { q: 'whaaaaaaa', c: ['a0', 'a1', 'a2','a3', 'a4', 'a5'] },
    { q: 'whbbbbbbb', c: ['b0', 'b1', 'b2','b3', 'b4', 'b5'] },
    { q: 'whbbbbbbb', c: ['b0', 'b1', 'b2','b3', 'b4', 'b5'] },
    { q: 'whddddddd', c: ['d0', 'd1', 'd2','d3', 'd4', 'd5'] },
    { q: 'wheeeeeee', c: ['e0', 'e1', 'e2','e3', 'e4', 'e5'] },
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }

    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shffledChoices = shuffle([...quizSet[currentNum].c]);
    console.log(quizSet[currentNum].c)
    shffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent=`Score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();

    }
  });

}
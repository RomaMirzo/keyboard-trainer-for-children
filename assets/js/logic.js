"use strict";

let textFill = document.getElementById('newText');
let input = document.getElementById('input');
let warning = document.getElementById('warning');

let strokeNumber = 0;
let test = [
  'Тетя Сова и кошка',
  'Сидели у окошка.',
  'Сова спросила: "Кис-кис-кис,',
  'Ты ловить умеешь крыс?"',
  '"Муррр," - сказала кошка,',
  'Помолчав немножко.'
];

let newLetters = test[0].split('');
newLetters = newLetters.shift();

let oldLetters = test[0].split('');
oldLetters.shift();
oldLetters = oldLetters.join('');

let testTextArray = oldLetters.split('');

let userLetter, userTextArray;

addText(newLetters, oldLetters);

let startTest = () => {
  let testCheck = setInterval(() => {
    // если написали все строки - выводим алерт
    if(test.length === strokeNumber) {
      clearInterval(testCheck);

      let repeatTest = confirm('Ты молодец! Уверен, что сможешь ещё быстрее ;) Повторим попытку?');

      if(repeatTest) {
        strokeNumber = 0;
        
        newLetters = test[0].split('');
        newLetters = newLetters.shift();
        
        oldLetters = test[0].split('');
        oldLetters.shift();
        oldLetters = oldLetters.join('');

        testTextArray = oldLetters.split('');
        
        addText(newLetters, oldLetters);
        
        startTest();
      }
    }

    // принимаем буквы от пользователя
    userLetter = input.value;
    userTextArray = userLetter.split('');

    // если закончилась строка - добавляем новую
    if(testTextArray.length < 1 && !newLetters) {
      strokeNumber++;

      oldLetters = test[strokeNumber];
      if(oldLetters) testTextArray = oldLetters.split('');

      newLetters = testTextArray.shift();

      updateTest(newLetters, testTextArray);
    }

    // если буквы совпадают - красим нажатую в зелёный
    if(userLetter === newLetters) {
      newLetters = testTextArray.shift();
      
      updateTest(newLetters, testTextArray);
    }

    // если в инпуте больше одной буквы - что-то вводится не то
    isWarning();
  }, 10);
}

input.addEventListener('click', () => {
  input.placeholder = '';
  startTest();
});

function addText(newText, oldText) {
  if(newText === undefined) newText = 'Молодец!';

  textFill.insertAdjacentHTML('beforeend', `
  <p id="added">
    <span class="rightLetters">${newText}</span>${oldText}
  </p>
  `);

  let oldElement = document.querySelectorAll('#added');
  if(oldElement.length > 1) {
    oldElement[0].remove();
  }
}

function updateTest(newLettters, oldLetters) {
  oldLetters = oldLetters.join('');
  addText(newLettters, oldLetters);
  input.value = '';
}

function isWarning() {
  if(input.value.length > 1) {
    warning.classList.add('badWarning');
    warning.innerHTML = 'Что-то не так :(';
  } else {
    warning.classList.remove('badWarning');
    warning.innerHTML = 'Всё отлично :)';
  }
}

/*
Тетя Тротт и кошка
Сидели y окошка.
Тротт спросила: «Кис-кис-кис,
Ты ловить умеешь крыс?»
«Муррр,» — сказала кошка,
Помолчав немножко.

Птичка по небу летела,
Птичка кушать захотела,
Зорким взглядом свысока
Отыскала червячка.
Но спикировав на ветку,
Вдруг наткнулась на соседку,
Началась меж ними стычка —
На двоих одна добыча.
Долго спорили, до слез —
А червяк давно уполз.
*/
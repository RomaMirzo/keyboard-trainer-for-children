"use strict";

let textFill = document.getElementById('newText');
let input = document.getElementById('input');
let warning = document.getElementById('warning');

let newGame = false;

let strokeNumber = 0;
let test = [
  'Тетя Сова и кошка',
  'Сидели у окошка.',
  'Сова спросила: "Кис-кис-кис,',
  'Ты ловить умеешь крыс?"',
  '"Муррр," - сказала кошка,',
  'Помолчав немножко.'
];

let newLetters = '';
let oldLetters = test[strokeNumber];

addText('', oldLetters);

let testTextArray = oldLetters.split('');
let userLetter;

setInterval(() => {
  // если написали все строки - выводим алерт
  if(test.length === strokeNumber) {
    alert('Ты молодец! Уверен, что сможешь ещё быстрее ;)');
    newGame = true;
  }

  userLetter = input.value;
  let userTextArray = userLetter.split('');

  // если закончилась строка - добавляем новую
  if(testTextArray.length < 1) {
    if(newGame) {
      strokeNumber = 0;
      newGame = false;
    } else {
      strokeNumber++;
    }
    oldLetters = test[strokeNumber];
    if(oldLetters) testTextArray = oldLetters.split('');

    if(oldLetters === undefined) oldLetters = 'Молодец!';

    addText('', oldLetters);
    input.value = '';
  }

  // если буквы совпадают - красив нажатую в зелёный
  if(userLetter === testTextArray[0]) {
    newLetters = userTextArray[0];
    testTextArray.shift();
    oldLetters = testTextArray.join('');

    addText(newLetters, oldLetters);
    input.value = '';
  }

  // если в инпуте больше одной буквы - что-то вводится не то
  if(input.value.length > 1) {
    warning.classList.add('badWarning');
    warning.innerHTML = 'Что-то не так :(';
  } else {
    warning.classList.remove('badWarning');
    warning.innerHTML = 'Всё отлично :)';
  }
}, 10);

function addText(newText, oldText) {
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
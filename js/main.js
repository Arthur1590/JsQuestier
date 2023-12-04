
let x, y, z;
x = parseFloat(prompt('Введите первое число'));
y = parseFloat(prompt('Введите второе число'));
z = parseFloat(prompt('Введите третье число'));

let average = (x + y + z) / 3;
console.log('The average value is: ' + average);

let userName = prompt('Ваше имя');
console.log('Меня зовут ' + userName);

let userAge = +prompt('Сколько вам лет?')
console.log('Мне ' + userAge + ' лет');

let answOne = +prompt('Решите пример 6 + 3 = ?');
console.log('Пример 1: ' + '6 + 3 = 9' + ' Ваш ответ: ' + answOne);

let answTwo = +prompt('Решите прмер 20 - 5 = ?');
console.log('Пример 2: ' + '20 - 5 = 15 ' + ' Ваш ответ: ' + answTwo);

let answThre = +prompt('Решите пример 15 * 2 = ?');
console.log('Пример 3: ' + '15 * 2 = 30 ' + ' Ваш ответ: ' + answThre);

let answFour = +prompt('Решите пример 8 / 4 = ?');
console.log('Пример 4: ' + '8 / 4 = 2 ' + ' Ваш ответ: ' + answFour);

let answFifth = +prompt('Решите пример 10 % 3 = ?')
console.log('Пример 5: ' + '10 % 3 = 1 ' + ' Ваш ответ: ' + answFifth);

alert('Конец')
let endmss = 'Конец опроса';
console.log(endmss);




//
const EVENT_PLACEHOLDER = {
  clientX: window.innerWidth / 2,
  // clientX: window.innerWidth / 5,
  clientY: window.innerHeight / 2,
  // clientY: window.innerHeight / 5
};



class CursorReplacement {
  constructor(element) {
    this.element = element;
    this.lines = element.querySelectorAll('.cursor-replacement__line');

    this.initEventListeners();
    this.onMouseMove(EVENT_PLACEHOLDER);
  }

  initEventListeners() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(e) {
    const mouseX = (100 * e.clientX / window.innerWidth).toFixed(2);
    const mouseY = (100 * e.clientY / window.innerHeight).toFixed(2);

    [].forEach.call(this.lines, line => {
      line.setAttribute('x2', mouseX);
      line.setAttribute('y2', mouseY);
    });
  }
}



class Navigation {
  constructor(element) {
    this.element = element;
    this.title = element.querySelector('.navigation__title');
    this.texts = element.querySelectorAll('.navigation__text');
    this.links = element.querySelectorAll('.navigation__link');
    this.linksPositions = [];
    this.hoveredLinkIndex = -1;

    this.initEventListeners();
    this.updateLinksPositions();

    this.onMouseMove(EVENT_PLACEHOLDER);
  }

  initEventListeners() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('resize', this.updateLinksPositions.bind(this));

    [].forEach.call(this.links, (link, index) => {
      link.addEventListener('mouseover', this.onLinkMouseOver.bind(this, index));
      link.addEventListener('mouseout', this.onLinkMouseOut.bind(this, index));
    });
  }

  updateLinksPositions() {
    this.linksPositions = [].map.call(this.links, link => {
      const transform = link.style.transform;
      link.style.transform = `translateX(0) translateY(0)`;
      const rect = link.getBoundingClientRect();
      link.style.transform = transform;

      return {
        x: (100 * rect.left / window.innerWidth).toFixed(2),
        y: (100 * rect.top / window.innerHeight).toFixed(2)
      };

    });
  }

  onMouseMove(e) {
    const mouseX = (100 * e.clientX / window.innerWidth).toFixed(2);
    const mouseY = (100 * e.clientY / window.innerHeight).toFixed(2);

    [].forEach.call(this.links, (link, index) => {
      const text = this.texts[index];
      const linkPosition = this.linksPositions[index];

      const dx = linkPosition.x - mouseX;
      const dy = linkPosition.y - mouseY;
      const delta = Math.sqrt(dx * dx + dy * dy);
      const deltaXpx = window.innerWidth * dx / 100;
      const deltaYpx = window.innerHeight * dy / 100;

      link.style.transform = `translateX(${deltaXpx}px) translateY(${deltaYpx}px)`;
      link.style.opacity = 1 / delta;
      text.style.opacity = 1 / delta;

      if (this.hoveredLinkIndex === index) {
        text.style.opacity = 1;
      }
    });

    this.title.style.opacity = 10 / (Math.abs(50 - mouseX) + Math.abs(50 - mouseY));
  }

  onLinkMouseOver(index) {
    const text = this.texts[index];
    this.hoveredLinkIndex = index;

    [].forEach.call(text.querySelectorAll('.navigation__text-layer'), layer => {
      layer.classList.add('navigation__text-layer--glitch');
    });
  }

  onLinkMouseOut(index) {
    const text = this.texts[index];
    this.hoveredLinkIndex = -1;

    [].forEach.call(text.querySelectorAll('.navigation__text-layer'), layer => {
      layer.classList.remove('navigation__text-layer--glitch');
    });
  }
}



const cursorReplacement = new CursorReplacement(document.querySelector('.cursor-replacement'));
const navigation = new Navigation(document.querySelector('.navigation'));






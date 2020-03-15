// инициализация
// навигация
const navLinks = document.querySelectorAll('nav ul li a');

// слайдер
const sliderWidthMax = 1020;
const sliderInitialPos = 0;
let sliderCurrentPos = sliderInitialPos;
let slider = document.querySelector('.slider');
let slidesWrapper = document.querySelector('.slider__slides');
let slides = document.querySelectorAll('.slider__slides .slide');
let slidesCount = slides.length;
let rightArrow = document.querySelector('.slider__control.slider__right');
let leftArrow = document.querySelector('.slider__control.slider__left');

// убрать стиль со всех элементов коллекции
function removeStyleFromCollection(collection, style){
    collection.forEach(elem => {elem.classList.remove(style)});
}

// дать стиль элементу
function addStyleToElement(element, style){
    element.classList.add(style);
}

// перемешать массив
function shuffle(arr) {
    let i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
};

// собрать в объект данные из формы
function gatherFormData(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let details = document.getElementById('details').value;
    return { name, email, subject, details };
}

// создать новый элемент со списком классов и текстом внутри
function createElementWithClassList(tag, classArr = [], text = ''){
    let newProj = document.createElement(tag);
    classArr.forEach(cl => {
        newProj.classList.add(cl);
    });
    newProj.innerText = text;
    return newProj;
}

// ссылки навигации
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        removeStyleFromCollection(navLinks, 'active');
        addStyleToElement(event.target, 'active');
        // скроллится медленно благодаря св-ву css scroll-behavior
    });
})

// слайдер
rightArrow.addEventListener('click', function(){
    if (sliderCurrentPos >= (slidesCount-1)){
        slidesWrapper.style.transform = 'translateX(0px)';
        sliderCurrentPos = 0;
    } else {
        slidesWrapper.style.transform = 'translateX(-' + sliderWidthMax * (sliderCurrentPos+1) + 'px)';
        sliderCurrentPos++;
        
    }
});

leftArrow.addEventListener('click', function(){
    if (sliderCurrentPos <= 0){
        slidesWrapper.style.transform = 'translateX(-' + sliderWidthMax * (slidesCount - 1) + 'px)';
        sliderCurrentPos = slidesCount-1;
    } else {
        slidesWrapper.style.transform = 'translateX(' + sliderWidthMax * (-1) * (sliderCurrentPos - 1) +  'px)';
        sliderCurrentPos--;
    }
});

// вкл/выкл экраны телефонов
let phoneVert = document.querySelector('.slide__phones__left');
phoneVert.addEventListener('click', () => {
    phoneVert.querySelector('.slide__phones__left__phone').classList.toggle('off');
});

let phoneHor = document.querySelector('.slide__phones__right');
phoneHor.addEventListener('click', () => {
    phoneHor.querySelector('.slide__phones__right__phone').classList.toggle('off');
});

// рамка вокруг картинок в Портфолио
let projects = document.querySelectorAll('.projects__project');
projects.forEach(proj => {
    proj.addEventListener('click', (event) => {
        removeStyleFromCollection(projects, 'project_border');
        addStyleToElement(event.target, 'project_border');
    });
})

// переключение табов
let tags = document.querySelectorAll('.portfolio__tags ul li');
let projectsContainer = document.querySelector('.projects');
let projArr = [...Array(projects.length).keys()];

tags.forEach(li => {
    li.addEventListener('click', (event) => {

        // убрать стили активности у всех, добавить одной
        removeStyleFromCollection(tags, 'active');
        addStyleToElement(event.target, 'active');

        // удалить все проекты из контейнера
        projectsContainer.textContent = '';
        let shuffled = shuffle(projArr);
        // создать новые элементы с проектами в случайном порядке
        for(let i = 0; i < projArr.length; i++){
            let newProj = createElementWithClassList('div', [
                'projects__project',
                'project' + (shuffled[i]+1)
            ]);
            // так как новые элементы динамически созданы, им тоже надо добавить обработчики
            newProj.addEventListener('click', (event) => {
                removeStyleFromCollection(document.querySelectorAll('.projects__project'), 'project_border');
                addStyleToElement(event.target, 'project_border');
            });
            projectsContainer.appendChild(newProj);
        }
    });
});

// обработка отправки формы
let form = document.getElementById('form');
let modalForm = document.getElementById('modal');
let modalFormMessage = document.querySelector('#modal .modal__message');
let modalFormMessageSubj = document.querySelector('#modal .modal__message__subject');
let modalFormMessageDet = document.querySelector('#modal .modal__message__details');
let modalFormButton = document.querySelector('#modal .modal__message .modal__button');

// обработка отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    modalFormMessageSubj.innerHTML = '';
    modalFormMessageDet.innerHTML = '';

    let formData = gatherFormData();

    let subject = (formData.subject == 'Singolo') ? ' Тема: Singolo' : 'Без темы';
    let details = (formData.details != '') ? ' Описание: ' + formData.details : 'Без описания';
    
    modalFormMessageSubj.innerHTML = subject;
    modalFormMessageDet.innerHTML = details;
    modalForm.style.display = 'block';
});

// нажатие на кнопку ОК в модальном окне
modalFormButton.addEventListener('click', ()=>{
    modalForm.style.display = 'none';
})

